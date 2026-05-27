import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("GEMINI_API_KEY not set. Run: node --env-file=.env.local scripts/gen-liderstvo-avatars.mjs");
  process.exit(1);
}
const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent";
const DIR = path.resolve(__dirname, "../public/images/liderstvo");

const avatars = [
  { name: "person-1.webp", prompt: "Professional headshot portrait, Central Asian man in his 40s, confident CEO look, dark suit, modern office background blurred, corporate portrait, warm lighting, photorealistic, square crop" },
  { name: "person-2.webp", prompt: "Professional headshot portrait, Central Asian woman in her 30s, smart confident look, elegant blouse and blazer, modern office background, corporate portrait, natural lighting, photorealistic, square crop" },
  { name: "person-3.webp", prompt: "Professional headshot portrait, Central Asian man in his 30s, thoughtful professional look, white shirt dark jacket, modern office background blurred, corporate portrait, warm studio lighting, photorealistic, square crop" },
];

async function gen(item) {
  console.log("  Generating:", item.name);
  const res = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: item.prompt }] }], generationConfig: { responseModalities: ["TEXT", "IMAGE"] } }),
  });
  if (!res.ok) { console.error("  ERROR", res.status, (await res.text()).slice(0,200)); return; }
  const data = await res.json();
  for (const c of (data.candidates || [])) {
    for (const p of (c.content?.parts || [])) {
      if (p.inlineData) {
        fs.writeFileSync(path.join(DIR, item.name), Buffer.from(p.inlineData.data, "base64"));
        console.log("  OK:", item.name);
        return;
      }
    }
  }
}

for (const a of avatars) {
  await gen(a);
  await new Promise(r => setTimeout(r, 2000));
}
console.log("DONE");
