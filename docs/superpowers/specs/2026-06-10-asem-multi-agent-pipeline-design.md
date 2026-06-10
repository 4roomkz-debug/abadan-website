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
- **`/api/chat/v2/route.ts`** — new multi-agent endpoint. POST only. Reuses the same `isAllowedOrigin`, `rateLimit`, `getClientIp`, and message-shape validation (`isValidMessages`) currently in legacy `route.ts` — these are factored into `src/app/api/chat/_shared.ts` as part of this work so both routes import from one source.
- **`src/app/api/chat/v2/agents.ts`** — three focused system prompts, three Zod output schemas, three handoff condition helpers. Kept separate from the route file to keep the route under ~200 LOC.
- **`src/components/AiChat.tsx`** — reads a cookie `chat_pipeline` on mount, decides which endpoint to POST to. Holds a `meta` object in component state in parallel to `messages`. Handles HTTP 410 from v2 by clearing the cookie and showing a one-line notice.

### 4.2 Request / response shape

```ts
// POST /api/chat/v2
type Request = {
  messages: { role: "user" | "assistant"; content: string }[];
  meta?: { stage: Stage; state: PipelineState };  // omitted on first turn
};

type Response =
  | { message: string; meta: { stage: Stage; state: PipelineState } }
  | { error: "experiment_disabled" }   // HTTP 410 — kill-switch ON
  | { error: "invalid_input" }         // HTTP 400 — origin/shape/size fail
  | { error: "rate_limited" }          // HTTP 429
  | { error: "upstream_failed" };      // HTTP 502 — DeepSeek down after retry
```

`meta` is opaque to the client — it just stores and round-trips it. **The server treats `meta` as untrusted client input** and validates it on every request (see §4.5). The server is the only place that reads/writes fields inside `meta.state`.

### 4.3 Per-request flow

```
1. Client POSTs { messages, meta? }.
2. Origin / rate-limit / message-shape checks (shared with legacy). Failures
   short-circuit with 400 / 429 before any LLM call.
3. Validate meta (§4.5). On invalid stage or invalid state field → reset to
   { stage: "qualifying", state: {} } and log a warning. Never trust client.
4. Server picks the agent by meta.stage:
       qualifying → Qualifier
       matching   → Value Matcher
       closing    → Closer
       done       → Closer (post-handoff farewell behavior, no further handoff)
5. Server builds the prompt for that one agent only:
       - agent's focused system prompt as a role:"system" message
       - the user-visible conversation history mapped to OpenAI roles
       - the current state JSON appended as a SEPARATE role:"system" message
         tagged "[CURRENT PIPELINE STATE]" so the agent treats it as ground
         truth rather than user-provided content
6. Server calls DeepSeek with response_format: json_object,
   temperature 0.7, max_tokens 400.
7. Server validates the returned JSON against the agent's Zod schema.
       - On parse failure: one retry with appended instruction
         "Верни ответ строго по JSON-схеме. Без префиксов и пояснений."
       - On second failure: return a static fallback reply, leave stage/state unchanged.
8. Server merges state_update into state with these rules:
       - keys with undefined values: ignored (no overwrite)
       - keys with defined values: overwrite previous value
       - arrays: replaced wholesale (not concatenated)
       - empty string or empty array on a previously-set field: ignored
         (treated as the LLM "forgetting" rather than clearing intent)
9. If handoff !== null: stage transitions to handoff value.
10. Telegram lead is fired iff:
       - new stage === "done"
       - state.phone present and not a company-phone match
       - state.lead_sent !== true (server sets this flag after firing)
    Server stores lead_sent on the state going back to the client; on every
    subsequent request the server re-checks this flag, so a reload-and-replay
    of the same meta cannot double-fire. Inside one serverless instance,
    a request-scoped guard also prevents simultaneous double-fire.
11. Server returns { message, meta: { stage, state } }.
```

### 4.4 Kill-switch

If env `CHAT_V2_DISABLED=1`, step 2 returns HTTP 410 with body `{ error: "experiment_disabled" }`. The client clears its cookie and shows a one-line notice asking the user to refresh.

### 4.5 Server-side `meta` validation

A Zod schema gates every incoming `meta`:

```ts
const StageSchema = z.enum(["qualifying", "matching", "closing", "done"]);
const PipelineStateSchema = z.object({
  role: z.enum(["hr","owner","manager","employee","other"]).optional(),
  industry: z.string().max(120).optional(),
  // ... mirrors the type in §4.6 exactly
  lead_sent: z.boolean().optional(),  // server-only; client may not set
}).strict();  // unknown keys are rejected, not silently passed
```

Unknown keys, wrong types, oversize strings, or an unknown stage all collapse to a default fresh meta with a log line `meta_reset_reason: "..."`. The `lead_sent` flag, if present in client input, is stripped before validation (clients cannot suppress lead delivery by spoofing).

### 4.6 State schema

```ts
type Stage = "qualifying" | "matching" | "closing" | "done";

type PipelineState = {
  // Filled by Qualifier
  role?: "hr" | "owner" | "manager" | "employee" | "other";
  industry?: string;       // free text, max 120 chars; documented limitation §11
  company_size?: "solo" | "small" | "medium" | "large";
  pain_point?: string;     // max 500 chars

  // Filled by Value Matcher
  training_area?: "soft-skills" | "leadership" | "ai-hr" | "oil-gas" | "other";
  format_preference?: "online" | "offline" | "corporate" | "open" | "any";
  timeline?: string;       // max 120 chars
  programs_suggested?: string[];        // max 5 items
  interest_confirmed?: boolean;         // gates Matcher → Closer handoff (§5.2)

  // Filled by Closer
  name?: string;           // max 80 chars
  phone?: string;          // raw user input, max 30 chars
  callback_preference?: string;         // max 120 chars
  ready_to_handoff?: boolean;

  // Server-only — never set by client, never set by agent
  lead_sent?: boolean;     // sticky once true; gates Telegram side effect
};
```

All fields optional. Stages move forward only. Length caps exist to bound prompt growth (§11) and to limit log payload size.

## 5. Agents

### 5.1 Qualifier

- **Purpose:** Warm intro, identify `role`, optionally `industry` and `company_size`, capture `pain_point`. Does not discuss programs, prices, or contacts.
- **Context loaded into prompt:** persona, conversation style rules (feminine grammatical gender, short replies). **No catalog, no FAQ.**
- **Handoff condition (to `matching`):** (`state.role` set AND `state.pain_point` set) OR (`state.pain_point` set AND user-turn count in this stage ≥ 3). The OR-clause prevents stalling when a user is willing to describe their pain but won't categorize their role.
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
- **Handoff condition (to `closing`):** `state.training_area` set, `state.programs_suggested.length >= 1`, **and** `state.interest_confirmed === true`. The agent is responsible for setting `interest_confirmed` when it observes an explicit signal ("да, интересно", "как записаться", "расскажите подробнее про X", Kazakh/English equivalents). Gating on a boolean state field rather than re-parsing the user message makes the handoff condition testable from the spec alone.
- **Output schema:**
  ```json
  {
    "reply": "string",
    "state_update": {
      "training_area": "soft-skills|leadership|ai-hr|oil-gas|other",
      "format_preference": "online|offline|corporate|open|any",
      "timeline": "string",
      "programs_suggested": ["string"],
      "interest_confirmed": true | false
    },
    "handoff": null | "closing"
  }
  ```

### 5.3 Closer

- **Purpose:** Capture `name` and `phone`, optionally `callback_preference`. References accumulated state in its reply ("чтобы Индира уже знала контекст"). Hands off to `done`.
- **Context loaded into prompt:** persona + style rules + state JSON dump (so the reply can reference what was discussed). **No catalog, no FAQ.**
- **Handoff condition (to `done`):** `state.phone` set, and the phone's last 10 digits do **not** match `COMPANY_INFO.phone` (reuses the defensive filter from the current code).
- **Side effect on entering `done`:** server calls `sendLeadToTelegram(...)` with role, pain_point, programs_suggested, name, phone, callback_preference. Idempotency is enforced by the server-only `state.lead_sent` flag (§4.3 step 10, §4.6) — a tampered or replayed `meta` cannot trigger a second send.
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

### 6.2 Rollback levels

1. **User opt-out (not a real rollback, just a self-service exit):** visit `?agents=0`. Cookie cleared, next message goes through legacy.
2. **Server kill-switch (the actual first-line rollback):** set ENV `CHAT_V2_DISABLED=1` on Vercel. v2 route returns HTTP 410 `{ error: "experiment_disabled" }`. Client clears its cookie on receiving 410 and shows a one-line notice. No redeploy required.
3. **Atomic teardown:** delete `src/app/api/chat/v2/route.ts`, `src/app/api/chat/v2/agents.ts`, and the cookie/410 branch in `AiChat.tsx`. The shared module `_shared.ts` stays (legacy uses it too).

### 6.3 Compatibility

- Legacy `/api/chat` keeps its existing `{ messages } → { message }` shape. v2 augments with `meta`.
- Client stores `meta` separately from `messages`. If a user toggles `?agents=0` mid-conversation, `messages` still flows correctly to legacy, `meta` is just dropped.

## 7. Observability

Per-request structured log line written to `console.log` (Vercel Logs captures stdout).

```json
{
  "ts": "2026-06-10T12:34:56.789Z",
  "stage_in": "qualifying",
  "stage_out": "matching",
  "handoff_decided": true,
  "duration_ms": 980,
  "messages_count": 4,
  "state_after_keys": ["role", "industry", "pain_point"],
  "state_after_redacted": {
    "role": "hr",
    "industry": "ритейл",
    "pain_point": "<…>",
    "name": "<REDACTED>",
    "phone": "<REDACTED:+7***34>",
    "callback_preference": "<…>"
  },
  "json_parse_retry": false,
  "meta_reset_reason": null,
  "lead_fired": false
}
```

**Privacy rules — load-bearing:**
- `reply` text and user message contents are NEVER logged.
- `name` is replaced with `<REDACTED>` in logs.
- `phone` is replaced with last-4 digits masked: `<REDACTED:+7***34>`.
- Free-text fields (`pain_point`, `industry`, `timeline`, `callback_preference`) are logged as length only (`<…>` placeholder) by default; a single env var `CHAT_V2_LOG_FREETEXT=1` can be flipped for short eval sessions, with the understanding that Vercel Logs then become PII-adjacent and should not be exported. Off by default in production.
- `state_after_keys` is always full — knowing WHICH fields are filled is the artifact under study; their values are not.

## 8. Replay script — `scripts/v2-replay.mjs`

A Node script that:

**Origin-check bypass.** v2 inherits `isAllowedOrigin` from `_shared.ts`, which rejects POSTs with no Origin header (i.e. non-browser clients). The replay script either (a) sets `Origin: http://localhost:3000` to look like a dev browser, or (b) is run with an env `CHAT_V2_REPLAY_TOKEN` whose value matches a server-side `REPLAY_TOKEN`, in which case the origin check is bypassed for that request only. The token bypass is what we use against deployed Vercel; the Origin spoof is fine for `npm run dev`.

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

- **New:** `src/app/api/chat/_shared.ts` — extracts `isAllowedOrigin`, `getClientIp`, `rateLimit`, `isValidMessages` from the current `route.ts` so both endpoints import from one source.
- **New:** `src/app/api/chat/v2/route.ts` — the multi-agent endpoint and orchestrator. Imports `_shared.ts`, imports `agents.ts`, imports `AI_PERSONA`, `COMPANY_INFO`, `TRAININGS`, `TRAINING_FORMATS`, `PRICING_INFO`, `FAQ` from `@/data/ai-knowledge` (same path legacy uses).
- **New:** `src/app/api/chat/v2/agents.ts` — three system prompts, three Zod output schemas, three handoff-condition helpers. Kept separate from route to keep route under ~200 LOC.
- **New:** `scripts/v2-replay.mjs` — replay harness.
- **Modified:** `src/app/api/chat/route.ts` — switches to importing from `_shared.ts` instead of inlining helpers. No behavior change.
- **Modified:** `src/components/AiChat.tsx` — cookie read, conditional endpoint selection, `meta` state, `[v2]` badge, gracefully handle HTTP 410 by clearing the cookie.
- **Unchanged:** `src/data/ai-knowledge.ts`.

## 10. Known limitations / future work

- **Forward-only stages.** If a user comes back with a catalog question after entering `closing`, Closer answers from its own (catalog-less) prompt, which may produce a thinner reply than Matcher would. Acceptable for v1; revisit if it shows up in replay.
- **No conversational memory across sessions.** Each visit is a new conversation; closing the tab loses everything. Same as legacy.
- **Early phones are dropped, not deferred.** Legacy used a regex over user messages to catch a phone wherever it appeared. v2 has no such fallback: only Closer is taught to record `state.phone`. If the user writes `+7 701 555 12 34` in turn 1, that string is never recorded; the natural flow eventually reaches Closer, who asks again. Replay scenario #4 watches for this; in practice, if it bites real users, the v2 server can add a "phone-spotted in pre-Closer turn" log line so we can quantify before deciding to add a side-channel capture.
- **No tool calling.** Once the prompt-shaped pipeline is comfortable, the natural next step is to wire actual tools — a `lookup_training` function for Matcher, a `book_callback` function for Closer. Out of scope for v1.

## 11. Open questions for review

- The `industry` field uses free text instead of an enum. Matcher must do its own free-text→category mapping. Resolution choice for v1: **keep as free text**, accept the looseness. If Matcher routing turns out to depend hard on this field during replay, promote to an enum in v2's v2.
- State length caps in §4.6 should keep the Closer prompt bounded; if a Matcher run accidentally fills `programs_suggested` with five long-named technical programs and `pain_point` is also near its cap, the Closer prompt can still hit a few hundred tokens of state alone. We rely on `max_tokens: 400` upstream as the hard backstop; revisit if any DeepSeek call truncates `reply` mid-sentence in the replay logs.
