#!/usr/bin/env node
// Generate hero video for liderstvo page via Google Veo 3.1 API

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("GEMINI_API_KEY not set. Run: node --env-file=.env.local scripts/gen-video-veo.mjs");
  process.exit(1);
}
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta";
const MODEL = "veo-3.1-generate-preview";

const VIDEOS = [
  {
    name: "liderstvo-hero.mp4",
    outputDir: path.resolve(__dirname, "../public/videos"),
    prompt:
      "Inspiring corporate leadership scene, executive confidently walking through modern glass office corridor, panoramic city skyline visible through floor-to-ceiling windows, golden hour sunlight streaming in, Central Asian businessman in dark suit, cinematic slow motion, warm color grading, professional corporate atmosphere, no text",
  },
];

async function generateVideo(item) {
  console.log(`\nGenerating: ${item.name}...`);
  console.log(`Prompt: ${item.prompt.slice(0, 80)}...`);

  // Step 1: Start generation
  const res = await fetch(`${BASE_URL}/models/${MODEL}:predictLongRunning?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt: item.prompt }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`ERROR ${res.status}: ${errText.slice(0, 300)}`);
    return false;
  }

  const data = await res.json();
  const operationName = data.name;

  if (!operationName) {
    console.error("No operation name returned:", JSON.stringify(data).slice(0, 300));
    return false;
  }

  console.log(`Operation: ${operationName}`);
  console.log("Polling for completion...");

  // Step 2: Poll until done
  let attempts = 0;
  const maxAttempts = 60; // 10 minutes max
  while (attempts < maxAttempts) {
    await new Promise((r) => setTimeout(r, 10000)); // 10s intervals
    attempts++;

    const pollRes = await fetch(`${BASE_URL}/${operationName}?key=${API_KEY}`);
    const pollData = await pollRes.json();

    if (pollData.done) {
      // Step 3: Download video
      const videoUri =
        pollData.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri;

      if (!videoUri) {
        console.error("No video URI in response:", JSON.stringify(pollData).slice(0, 300));
        return false;
      }

      console.log(`Video ready! Downloading...`);

      const videoRes = await fetch(`${videoUri}&key=${API_KEY}`);
      if (!videoRes.ok) {
        // Try without key parameter
        const videoRes2 = await fetch(videoUri, {
          headers: { "x-goog-api-key": API_KEY },
        });
        if (!videoRes2.ok) {
          console.error(`Download failed: ${videoRes2.status}`);
          return false;
        }
        const buffer = Buffer.from(await videoRes2.arrayBuffer());
        const outputPath = path.join(item.outputDir, item.name);
        fs.writeFileSync(outputPath, buffer);
        const sizeMB = (buffer.length / 1024 / 1024).toFixed(1);
        console.log(`OK: ${item.name} (${sizeMB} MB)`);
        return true;
      }

      const buffer = Buffer.from(await videoRes.arrayBuffer());
      const outputPath = path.join(item.outputDir, item.name);
      fs.writeFileSync(outputPath, buffer);
      const sizeMB = (buffer.length / 1024 / 1024).toFixed(1);
      console.log(`OK: ${item.name} (${sizeMB} MB)`);
      return true;
    }

    const progress = pollData.metadata?.percentComplete || "?";
    process.stdout.write(`  [${attempts}/${maxAttempts}] ${progress}% complete\r`);
  }

  console.error("Timed out waiting for video generation");
  return false;
}

async function main() {
  console.log("=== Video Generation (Google Veo 3.1) ===");

  for (const item of VIDEOS) {
    if (!fs.existsSync(item.outputDir)) {
      fs.mkdirSync(item.outputDir, { recursive: true });
    }
    await generateVideo(item);
  }

  console.log("\n=== DONE ===");
}

main().catch(console.error);
