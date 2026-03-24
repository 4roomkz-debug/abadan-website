#!/usr/bin/env node
// Generate hero video for AI training page via Google Veo 3.1

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAmKhpGKdKAuIb_JPqNMvUCds27Wd5Jmwo";
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta";
const MODEL = "veo-3.1-generate-preview";

async function generateVideo() {
  const prompt =
    "Futuristic AI technology workspace, multiple holographic screens displaying neural network visualizations and data flows, blue and teal ambient neon lighting, Central Asian professional interacting with floating digital interface, dark modern office environment, cinematic slow motion camera movement, professional corporate technology atmosphere, no text no watermarks";

  console.log("=== AI Hero Video (Google Veo 3.1) ===\n");
  console.log(`Prompt: ${prompt.slice(0, 80)}...`);
  console.log("Starting generation...");

  const res = await fetch(`${BASE_URL}/models/${MODEL}:predictLongRunning?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`ERROR ${res.status}: ${errText.slice(0, 300)}`);
    return;
  }

  const data = await res.json();
  const operationName = data.name;
  if (!operationName) {
    console.error("No operation name:", JSON.stringify(data).slice(0, 300));
    return;
  }

  console.log(`Operation: ${operationName}`);
  console.log("Polling...");

  for (let i = 1; i <= 60; i++) {
    await new Promise((r) => setTimeout(r, 10000));

    const pollRes = await fetch(`${BASE_URL}/${operationName}?key=${API_KEY}`);
    const pollData = await pollRes.json();

    if (pollData.done) {
      const videoUri =
        pollData.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri;
      if (!videoUri) {
        console.error("No video URI:", JSON.stringify(pollData).slice(0, 300));
        return;
      }

      console.log("\nDownloading...");
      const videoRes = await fetch(`${videoUri}&key=${API_KEY}`);
      if (!videoRes.ok) {
        const videoRes2 = await fetch(videoUri, { headers: { "x-goog-api-key": API_KEY } });
        if (!videoRes2.ok) { console.error(`Download failed: ${videoRes2.status}`); return; }
        const buf = Buffer.from(await videoRes2.arrayBuffer());
        const out = path.resolve(__dirname, "../public/videos/ai-hero.mp4");
        fs.writeFileSync(out, buf);
        console.log(`OK: ai-hero.mp4 (${(buf.length/1024/1024).toFixed(1)} MB)`);
        return;
      }

      const buf = Buffer.from(await videoRes.arrayBuffer());
      const out = path.resolve(__dirname, "../public/videos/ai-hero.mp4");
      fs.writeFileSync(out, buf);
      console.log(`OK: ai-hero.mp4 (${(buf.length/1024/1024).toFixed(1)} MB)`);
      return;
    }

    process.stdout.write(`  [${i}/60] waiting...\r`);
  }

  console.error("Timed out");
}

generateVideo().catch(console.error);
