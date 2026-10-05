// Offline route tests: node --experimental-vm-modules scripts/test-chat-event-date.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createContext, SourceTextModule, SyntheticModule } from "node:vm";
import ts from "typescript";

const compile = path => ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;

async function promptAt(isoDate) {
  let prompt;
  class FixedDate extends Date { static now() { return Date.parse(isoDate); } }
  const context = createContext({
    Request, Response, URL, Date: FixedDate, console: { error() {}, warn() {} }, process: { env: {} },
    async fetch(url, options) {
      assert.equal(url, "https://api.deepseek.com/chat/completions", "no real requests or lead delivery");
      prompt = JSON.parse(options.body).messages[0].content;
      return Response.json({ choices: [{ message: { content: "offline answer" } }] });
    },
  });
  const synthetic = values => new SyntheticModule(Object.keys(values), function () {
    for (const [name, value] of Object.entries(values)) this.setExport(name, value);
  }, { context });
  const next = synthetic({ NextResponse: Response, after() { assert.fail("no background tasks expected"); } });
  const webhook = synthetic({
    isUnifiedLeadWebhookConfigured: () => false,
    saveChatSession() { assert.fail("no real save"); }, sendUnifiedLead() { assert.fail("no real send"); },
  });
  const transcript = synthetic({
    SESSION_ID_RE: /^[a-z0-9-]+$/,
    clipMiddle: text => text,
    extractContactInfo: () => ({ hasContact: false }),
    formatTranscript: () => "",
  });
  const knowledge = new SourceTextModule(compile("../src/data/ai-knowledge.ts"), { context });
  await knowledge.link(() => assert.fail("knowledge should have no runtime imports"));
  await knowledge.evaluate();
  const route = new SourceTextModule(compile("../src/app/api/chat/route.ts"), { context });
  await route.link(specifier => {
    if (specifier === "next/server") return next;
    if (specifier === "@/data/ai-knowledge") return knowledge;
    if (specifier === "@/lib/server/leadWebhook") return webhook;
    if (specifier === "@/lib/chat/transcript") return transcript;
    throw new Error(`Unexpected import: ${specifier}`);
  });
  await route.evaluate();
  const response = await route.namespace.POST(new Request("https://abadan.test/api/chat", {
    method: "POST", body: JSON.stringify({ messages: [{ role: "user", content: "Какие мероприятия?" }] }),
    headers: { "Content-Type": "application/json", host: "abadan.test", origin: "https://abadan.test" },
  }));
  assert.equal(response.status, 200);
  return prompt;
}

const future = await promptAt("2026-01-29T12:00:00+05:00");
assert.ok(future.includes("БЛИЖАЙШЕЕ МЕРОПРИЯТИЕ"));
assert.ok(future.includes("- Регистрация:"));
for (const date of ["2026-01-30T11:30:00+05:00", "2026-10-05T12:00:00+05:00"]) {
  const past = await promptAt(date);
  assert.ok(past.includes("АРХИВНОЕ МЕРОПРИЯТИЕ"));
  assert.ok(!past.includes("БЛИЖАЙШЕЕ МЕРОПРИЯТИЕ"));
  assert.ok(!past.includes("- Регистрация:"));
  assert.ok(past.includes("регистрация закрыта"));
  assert.ok(past.includes("https://www.abadan.kz/schedule"));
}
console.log("Chat event date regressions: ALL PASS (no network)");
