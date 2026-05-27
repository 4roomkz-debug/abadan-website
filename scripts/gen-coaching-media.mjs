import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("GEMINI_API_KEY not set. Run: node --env-file=.env.local scripts/gen-coaching-media.mjs");
  process.exit(1);
}
const IMG_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent";
const VID_BASE = "https://generativelanguage.googleapis.com/v1beta";

const imgDir = path.resolve(__dirname, "../public/images/coaching");
const vidDir = path.resolve(__dirname, "../public/videos");
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

// Generate hero poster image
async function genImage() {
  console.log("Generating coaching hero poster...");
  const res = await fetch(`${IMG_ENDPOINT}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Executive coaching session, one-on-one meeting between coach and CEO in premium modern office, two Central Asian professionals in deep conversation, comfortable leather chairs, warm ambient lighting, bookshelves in background, confidential intimate atmosphere, cinematic, photorealistic" }] }],
      generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
    }),
  });
  if (!res.ok) { console.error("IMG ERROR", res.status); return; }
  const data = await res.json();
  for (const c of (data.candidates || [])) {
    for (const p of (c.content?.parts || [])) {
      if (p.inlineData) {
        fs.writeFileSync(path.join(imgDir, "hero-poster.webp"), Buffer.from(p.inlineData.data, "base64"));
        console.log("OK: hero-poster.webp");
        return;
      }
    }
  }
}

// Generate hero video
async function genVideo() {
  console.log("\nGenerating coaching hero video...");
  const res = await fetch(`${VID_BASE}/models/veo-3.1-generate-preview:predictLongRunning?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt: "Executive coaching session in premium modern office, two professionals having deep strategic conversation across elegant desk, warm ambient lighting, bookshelves and city view through windows, slow camera push-in, intimate confidential atmosphere, cinematic color grading, no text no watermarks" }],
    }),
  });
  if (!res.ok) { console.error("VID ERROR", res.status, (await res.text()).slice(0,200)); return; }
  const data = await res.json();
  const op = data.name;
  if (!op) { console.error("No operation"); return; }
  console.log("Operation:", op);

  for (let i = 1; i <= 60; i++) {
    await new Promise(r => setTimeout(r, 10000));
    const poll = await fetch(`${VID_BASE}/${op}?key=${API_KEY}`);
    const pd = await poll.json();
    if (pd.done) {
      const uri = pd.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri;
      if (!uri) { console.error("No URI"); return; }
      console.log("Downloading...");
      let vr = await fetch(`${uri}&key=${API_KEY}`);
      if (!vr.ok) vr = await fetch(uri, { headers: { "x-goog-api-key": API_KEY } });
      const buf = Buffer.from(await vr.arrayBuffer());
      fs.writeFileSync(path.join(vidDir, "coaching-hero.mp4"), buf);
      console.log(`OK: coaching-hero.mp4 (${(buf.length/1024/1024).toFixed(1)} MB)`);
      return;
    }
    process.stdout.write(`  [${i}/60] waiting...\r`);
  }
}

await genImage();
await new Promise(r => setTimeout(r, 2000));
await genVideo();
console.log("\nDONE");
