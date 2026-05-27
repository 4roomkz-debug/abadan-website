#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("GEMINI_API_KEY not set. Run: node --env-file=.env.local scripts/gen-one-image.mjs");
  process.exit(1);
}
const MODEL = "gemini-2.5-flash-image";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const BASE_DIR = path.resolve(__dirname, "../public/images/blog");

const name = process.argv[2];
const prompt = process.argv[3];

if (!name || !prompt) {
  console.error("Usage: node gen-one-image.mjs <filename.webp> <prompt>");
  process.exit(1);
}

console.log(`Generating: ${name}...`);
const res = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
  }),
});

if (!res.ok) {
  console.error(`ERROR ${res.status}: ${(await res.text()).slice(0, 300)}`);
  process.exit(1);
}

const data = await res.json();
for (const c of (data.candidates || [])) {
  for (const p of (c.content?.parts || [])) {
    if (p.inlineData) {
      fs.writeFileSync(path.join(BASE_DIR, name), Buffer.from(p.inlineData.data, "base64"));
      console.log(`OK: ${name}`);
      process.exit(0);
    }
  }
}
console.error("NO IMAGE in response");
process.exit(1);
