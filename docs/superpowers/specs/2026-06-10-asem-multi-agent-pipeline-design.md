# Asem Multi-Agent Pipeline — Design Spec

- **Date:** 2026-06-10
- **Status:** Draft (awaiting user review)
- **Owner:** Гани (4roomkz)
- **Scope:** Experimental opt-in version of the Asem chat assistant on abadangani.com / abadan.kz, gated behind a feature flag. Production single-agent chat stays untouched.

---

## 1. Context

The current Asem assistant ([src/app/api/chat/route.ts](../../../src/app/api/chat/route.ts)) is a single DeepSeek call: one system prompt holds persona + full catalog + FAQ + event details, the message history is passed in, lead capture is done with regex over user messages. It works for the small daily volume the site sees, and recent fixes hardened it (env-var rename, defensive lead filter, abuse-rate limit).

The owner wants to learn the **multi-agent sales-pipeline pattern** described in Sam Bhagwat's writing — focused subagents with explicit handoff and structured output — by applying it to a real surface they already control. The experiment runs in parallel to the production chat under a feature flag; users do not see it unless they opt in via URL.

**Primary success criterion:** the owner ends the experiment having concretely "felt" the four mechanics — *focused prompt / focused toolset*, *structured output*, *explicit handoff*, *lightweight evals*. Quality improvement over the single-agent baseline is **not** a success criterion for v1.

## 2. Goals

- Reproduce Bhagwat's canonical three-agent pipeline (Qualifier → Value Matcher → Closer) inside a Next.js route, with state flowing between agents via structured output.
- Keep the existing production chat fully intact and isolated; experiment must be safe-by-default for real visitors.
- Provide a minimal observability layer (Vercel Logs only, no DB) so the owner can inspect what each agent decided per request.
- Provide a small replay script (`scripts/v2-replay.mjs`) that drives 5 fixed test conversations and prints per-turn stage, state, latency.

## 3. Non-goals

- Improved answer quality vs. the single-agent baseline (out of scope; revisit only after this lands).
- LLM-as-judge automated evals (manual review of replay output is sufficient for v1).
- Persistent conversation storage (Postgres, Redis, KV) — all state flows via the client.
- Backwards handoff (e.g. Closer → Matcher when the user asks a catalog question after sharing their phone). v1 is forward-only; Closer answers off-stage questions itself without changing the stage.
- Casual handling of user replying with a phone before being asked (e.g. in the first message). v1: phone is only consumed by Closer; if seen earlier, the active agent ignores it and the natural flow eventually reaches Closer.
- Multilingual state field. DeepSeek already answers in the user's language; no `language` field on the state in v1.
- Tool/function calling. Agents have **prompt-shaped** focused contexts, not function tools. This is the canonical Bhagwat shape and the simpler starting point.

## 4. Architecture

### 4.1 Endpoint layout

- **`/api/chat/route.ts`** — existing single-agent chat. **Untouched.**
- **`/api/chat/v2/route.ts`** — new multi-agent endpoint. POST only.
- **`src/components/AiChat.tsx`** — reads a cookie `chat_pipeline` on mount, decides which endpoint to POST to. Holds a `meta` object in component state in parallel to `messages`.

### 4.2 Request / response shape

```ts
// POST /api/chat/v2
type Request = {
  messages: { role: "user" | "assistant"; content: string }[];
  meta?: { stage: Stage; state: PipelineState };  // omitted on first turn
};

type Response = {
  message: string;
  meta: { stage: Stage; state: PipelineState };
};
```

`meta` is opaque to the client — it just stores and round-trips it. The server is the only place that reads/writes fields inside `meta.state`.

### 4.3 Per-request flow

```
1. Client POSTs { messages, meta? }.
2. Server defaults meta to { stage: "qualifying", state: {} } if absent.
3. Server picks the agent by meta.stage:
       qualifying → Qualifier
       matching   → Value Matcher
       closing    → Closer
       done       → Closer (post-handoff farewell behavior)
4. Server builds the prompt for that one agent only:
       - agent's focused system prompt
       - the user-visible conversation history (mapped to OpenAI-style roles)
       - the current state JSON appended as a final system note
5. Server calls DeepSeek with response_format: json_object,
   temperature 0.7, max_tokens 400.
6. Server validates the returned JSON against the agent's output schema.
       - On parse failure: one retry with stricter instruction.
       - On second failure: return a static fallback reply, leave stage/state unchanged.
7. Server shallow-merges state_update into state.
8. If handoff !== null: stage transitions to handoff value.
9. If new stage === "done" (Closer just captured a phone): fire the
   existing sendLeadToTelegram(...) once. Skip the legacy regex extractor entirely.
10. Server returns { message, meta: { stage, state } }.
```

### 4.4 State schema

```ts
type Stage = "qualifying" | "matching" | "closing" | "done";

type PipelineState = {
  // Filled by Qualifier
  role?: "hr" | "owner" | "manager" | "employee" | "other";
  industry?: string;
  company_size?: "solo" | "small" | "medium" | "large";
  pain_point?: string;

  // Filled by Value Matcher
  training_area?: "soft-skills" | "leadership" | "ai-hr" | "oil-gas" | "other";
  format_preference?: "online" | "offline" | "corporate" | "open" | "any";
  timeline?: string;
  programs_suggested?: string[];

  // Filled by Closer
  name?: string;
  phone?: string;
  callback_preference?: string;
  ready_to_handoff?: boolean;
};
```

All fields optional. Stages move forward only.

## 5. Agents

### 5.1 Qualifier

- **Purpose:** Warm intro, identify `role`, optionally `industry` and `company_size`, capture `pain_point`. Does not discuss programs, prices, or contacts.
- **Context loaded into prompt:** persona, conversation style rules (feminine grammatical gender, short replies). **No catalog, no FAQ.**
- **Handoff condition (to `matching`):** `state.role` set AND `state.pain_point` set.
- **Output schema:**
  ```json
  {
    "reply": "string",
    "state_update": {
      "role": "hr|owner|manager|employee|other",
      "industry": "string",
      "company_size": "solo|small|medium|large",
      "pain_point": "string"
    },
    "handoff": null | "matching"
  }
  ```
  `state_update` is a partial: only changed fields included.

### 5.2 Value Matcher

- **Purpose:** Given `role` + `pain_point`, recommend 1–3 specific programs from the catalog. Clarify format / timeline. Does not collect contacts.
- **Context loaded into prompt:** persona + style rules + `TRAININGS` + `TRAINING_FORMATS` + concise `PRICING_INFO`. No FAQ.
- **Handoff condition (to `closing`):** `state.training_area` set, `state.programs_suggested.length >= 1`, **and** the last user message contains an explicit interest signal ("да, интересно", "как записаться", "расскажите подробнее про X" / equivalent in Kazakh/English).
- **Output schema:**
  ```json
  {
    "reply": "string",
    "state_update": {
      "training_area": "soft-skills|leadership|ai-hr|oil-gas|other",
      "format_preference": "online|offline|corporate|open|any",
      "timeline": "string",
      "programs_suggested": ["string"]
    },
    "handoff": null | "closing"
  }
  ```

### 5.3 Closer

- **Purpose:** Capture `name` and `phone`, optionally `callback_preference`. References accumulated state in its reply ("чтобы Индира уже знала контекст"). Hands off to `done`.
- **Context loaded into prompt:** persona + style rules + state JSON dump (so the reply can reference what was discussed). **No catalog, no FAQ.**
- **Handoff condition (to `done`):** `state.phone` set, and the phone's last 10 digits do **not** match `COMPANY_INFO.phone` (reuses the defensive filter from the current code).
- **Side effect on entering `done`:** server calls `sendLeadToTelegram(...)` with role, pain_point, programs_suggested, name, phone, callback_preference. Idempotent — only fires once per conversation, gated on the stage transition.
- **In `done` stage:** Closer's prompt is told the lead is already submitted; it just thanks and answers brief follow-ups without changing stage.
- **Output schema:**
  ```json
  {
    "reply": "string",
    "state_update": {
      "name": "string",
      "phone": "string",
      "callback_preference": "string",
      "ready_to_handoff": true | false
    },
    "handoff": null | "done"
  }
  ```

### 5.4 Shared DeepSeek call settings

- `model: "deepseek-chat"`
- `response_format: { type: "json_object" }`
- `temperature: 0.7` (lower than the legacy 0.9 — JSON is fussier under high variance)
- `max_tokens: 400`
- Retry policy on JSON parse failure: one retry with appended user message `"Верни ответ строго по JSON-схеме. Без префиксов и пояснений."` On second failure, static fallback reply and unchanged stage/state.

## 6. Feature flag and rollback

### 6.1 Activation

- Frontend reads `chat_pipeline` cookie on `AiChat` mount.
- If URL contains `?agents=1`, set cookie `chat_pipeline=v2`, max-age 30 days, same-site Lax.
- If URL contains `?agents=0`, delete the cookie.
- If cookie value is `v2`, the widget posts to `/api/chat/v2`; otherwise to `/api/chat`.
- A small `[v2]` badge appears in the chat header when in experimental mode, to avoid confusing screenshot sessions with real production.

### 6.2 Three-level rollback

1. **User-driven:** visit any page with `?agents=0`. Cookie cleared, next message goes through legacy.
2. **Server kill-switch:** ENV var `CHAT_V2_DISABLED=1` on Vercel. The v2 route immediately returns HTTP 410 Gone with a JSON body `{ error: "experiment_disabled" }`. Client shows a graceful message and clears its cookie. No redeploy required.
3. **Atomic:** delete `src/app/api/chat/v2/route.ts` and the cookie-reading branch from `AiChat.tsx`. Nothing else to undo.

### 6.3 Compatibility

- Legacy `/api/chat` keeps its existing `{ messages } → { message }` shape. v2 augments with `meta`.
- Client stores `meta` separately from `messages`. If a user toggles `?agents=0` mid-conversation, `messages` still flows correctly to legacy, `meta` is just dropped.

## 7. Observability

Per-request structured log line written to `console.log` (Vercel Logs captures stdout):

```json
{
  "ts": "2026-06-10T12:34:56.789Z",
  "stage_in": "qualifying",
  "stage_out": "matching",
  "handoff_decided": true,
  "duration_ms": 980,
  "messages_count": 4,
  "state_after_keys": ["role", "industry", "pain_point"],
  "state_after": { "role": "hr", "industry": "ритейл", "pain_point": "..." },
  "json_parse_retry": false
}
```

No `reply` text. No user message content (privacy). State is logged in full because that *is* the artifact under study.

## 8. Replay script — `scripts/v2-replay.mjs`

A Node script that:

1. Reads a list of 5 hard-coded scenarios. Each scenario is an array of user turns:
   ```js
   {
     name: "HR director, leadership pain",
     turns: [
       "Здравствуйте! Подскажите по тренингам.",
       "Я HR-директор, у нас руководители подразделений просели в управлении командой.",
       "Да, расскажите подробнее.",
       "Звучит хорошо, как записаться?",
       "Меня зовут Айгуль, +7 701 555 12 34"
     ]
   }
   ```
2. For each scenario: walks the turns, POSTing to a configurable base URL's `/api/chat/v2`, threading `meta` between calls.
3. After each turn, prints: `[scenario name] turn N → stage_in → stage_out, duration, state_after_keys, reply (truncated to 80 chars)`.
4. At end of each scenario, prints a final state dump and lists state fields that were never filled.

The five scenarios (rationale → desired behavior):
- **HR director, soft-skills.** Happy path → must reach `done` in 5–6 turns.
- **Owner, oil & gas, technical course.** Tests Matcher's ability to route to a non-soft-skills training area.
- **Curious browser, no real intent.** Qualifier should stay put, not hand off to Matcher.
- **User dumps phone in first message.** v1 expected behavior: phone is ignored until Closer is active; lead is captured later.
- **User asks for the manager's direct number / tries to bypass.** All three agents should politely stay in role.

Manual review: the owner reads the replay output and labels each scenario `good / ok / fail` in a comment block at the top of the script (re-edited each run). No automated grading in v1.

Cost: ~30–50 DeepSeek calls per full run, well under $0.15.

## 9. Affected files (intent only — actual diff produced in the plan)

- **New:** `src/app/api/chat/v2/route.ts` — the multi-agent endpoint and orchestrator.
- **New:** `src/app/api/chat/v2/agents.ts` — three system prompts, three output schemas, validation helpers. Kept separate from route to keep route under ~200 LOC.
- **New:** `scripts/v2-replay.mjs` — replay harness.
- **Modified:** `src/components/AiChat.tsx` — cookie read, conditional endpoint selection, `meta` state, `[v2]` badge, gracefully clear cookie on HTTP 410.
- **Unchanged:** `src/app/api/chat/route.ts`, `src/data/ai-knowledge.ts`.

## 10. Known limitations / future work

- **Forward-only stages.** If a user comes back with a catalog question after entering `closing`, Closer answers from its own (catalog-less) prompt, which may produce a thinner reply than Matcher would. Acceptable for v1; revisit if it shows up in replay.
- **No conversational memory across sessions.** Each visit is a new conversation; closing the tab loses everything. Same as legacy.
- **No casual phone capture.** If a user writes `+7 701 555 12 34` in the very first sentence, we still walk them through Qualifier and Matcher. Real-world data on whether this matters will come from replay scenario #4.
- **No tool calling.** Once the prompt-shaped pipeline is comfortable, the natural next step is to wire actual tools — a `lookup_training` function for Matcher, a `book_callback` function for Closer. Out of scope for v1.

## 11. Open questions for review

- The `industry` field uses free text instead of an enum. Catalog implications: Matcher will need to map free-text industry to its own routing logic. Acceptable, but worth flagging.
- The Closer prompt receives the full state JSON dump. If the state grows unexpectedly (e.g. very long `pain_point`), it could bloat the prompt. We rely on `max_tokens` upstream and on agents writing concise summaries; if this proves fragile, add an explicit length cap inside the merge step.
