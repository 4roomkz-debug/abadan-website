// Offline route tests: node --experimental-vm-modules scripts/test-contact-config.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createContext, SourceTextModule, SyntheticModule } from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../src/app/api/contact/route.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;

async function check({ unified = false, legacy = false, failure = false, body = {} }) {
  const leads = [];
  const requests = [];
  const context = createContext({
    Request, Response,
    console: { error() {}, warn() {} },
    process: { env: legacy ? { TELEGRAM_BOT_TOKEN: "test-token", TELEGRAM_CHAT_ID: "test-chat" } : {} },
    async fetch(url, options) { requests.push({ url, options }); return Response.json({ ok: true }); },
  });
  const next = new SyntheticModule(["NextResponse"], function () { this.setExport("NextResponse", Response); }, { context });
  const webhook = new SyntheticModule(["isUnifiedLeadWebhookConfigured", "sendUnifiedLead"], function () {
    this.setExport("isUnifiedLeadWebhookConfigured", () => unified);
    this.setExport("sendUnifiedLead", async lead => { leads.push(lead); if (failure) throw new Error("unavailable"); });
  }, { context });
  const route = new SourceTextModule(compiled, { context });
  await route.link(specifier => {
    if (specifier === "next/server") return next;
    if (specifier === "@/lib/server/leadWebhook") return webhook;
    throw new Error(`Unexpected import: ${specifier}`);
  });
  await route.evaluate();
  const response = await route.namespace.POST(new Request("https://abadan.test/api/contact", {
    method: "POST", body: JSON.stringify({ name: "Aibek", phone: "+77000000000", _elapsed: 5000, ...body }),
    headers: { "Content-Type": "application/json" },
  }));
  return { response, leads, requests };
}

const unified = await check({ unified: true });
assert.equal(unified.response.status, 200, "unified webhook must work without legacy Telegram credentials");
assert.equal(unified.leads.length, 1);
assert.equal(unified.requests.length, 0, "unified receiver owns delivery; no duplicate Telegram send");
assert.equal(unified.leads[0].source, "abadan.kz");

const failed = await check({ unified: true, failure: true });
assert.equal(failed.response.status, 502);
assert.equal(failed.requests.length, 0);

assert.equal((await check({})).response.status, 500, "missing legacy config must fail closed");
const legacy = await check({ legacy: true });
assert.equal(legacy.response.status, 200);
assert.equal(legacy.requests.length, 1);

const spam = await check({ unified: true, body: { website: "spam" } });
assert.equal(spam.response.status, 200);
assert.equal(spam.leads.length, 0);
console.log("Contact configuration regressions: ALL PASS (no network)");
