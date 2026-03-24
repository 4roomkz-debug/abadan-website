#!/usr/bin/env node
// Generate images for AI training landing page via Google Gemini API (Nano Banana)

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAmKhpGKdKAuIb_JPqNMvUCds27Wd5Jmwo";
const MODEL = "gemini-2.5-flash-image";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const BASE_DIR = path.resolve(__dirname, "../public/images/ai");

// Ensure output directory exists
if (!fs.existsSync(BASE_DIR)) {
  fs.mkdirSync(BASE_DIR, { recursive: true });
}

const IMAGES = [
  {
    name: "hero-poster.webp",
    prompt:
      "Modern tech workspace with multiple large screens showing AI neural network visualizations, futuristic blue and teal ambient lighting, Central Asian professional working with holographic data displays, dark modern office, cinematic, photorealistic",
    aspect: "16:9",
  },
  {
    name: "training-1.webp",
    prompt:
      "AI prompt engineering workshop, professionals typing on laptops with ChatGPT interface visible on projector screen, modern training room, Central Asian tech professionals, focused atmosphere, blue accent lighting, photorealistic",
    aspect: "4:3",
  },
  {
    name: "training-2.webp",
    prompt:
      "Business process automation seminar, team analyzing workflow diagrams on large screen, digital transformation workshop, Central Asian professionals with tablets, modern office, collaborative energy, photorealistic",
    aspect: "4:3",
  },
  {
    name: "training-3.webp",
    prompt:
      "AI agents development workshop, developers and business analysts working together, code on screens, robot assistant icon on whiteboard, Central Asian tech team, modern co-working space, creative atmosphere, photorealistic",
    aspect: "4:3",
  },
  {
    name: "training-4.webp",
    prompt:
      "AI certification ceremony, professional receiving digital transformation certificate, futuristic corporate setting, Central Asian business person, handshake, modern tech office background, warm lighting, photorealistic",
    aspect: "4:3",
  },
  {
    name: "person-1.webp",
    prompt:
      "Professional headshot, Central Asian woman in her 30s, smart tech-savvy look, modern blazer, subtle tech office background with screens, corporate portrait, photorealistic, warm lighting",
    aspect: "1:1",
  },
  {
    name: "person-2.webp",
    prompt:
      "Professional headshot, Central Asian man in his 40s, confident executive look, dark suit, modern office with ambient tech lighting background blurred, corporate portrait, photorealistic",
    aspect: "1:1",
  },
  {
    name: "person-3.webp",
    prompt:
      "Professional headshot, Central Asian man in his 30s, innovative and energetic expression, smart casual with blazer, modern co-working background, corporate portrait, natural lighting, photorealistic",
    aspect: "1:1",
  },
];

async function generateImage(item) {
  console.log(`  Generating: ${item.name}...`);

  const body = {
    contents: [{ parts: [{ text: item.prompt }] }],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  };

  try {
    const res = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`  ERROR ${res.status}: ${errText.slice(0, 200)}`);
      return false;
    }

    const data = await res.json();

    // Find image part in response
    const candidates = data.candidates || [];
    for (const candidate of candidates) {
      const parts = candidate.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          const { mimeType, data: b64 } = part.inlineData;
          const ext = mimeType.includes("png") ? "png" : mimeType.includes("webp") ? "webp" : "png";
          const outputPath = path.join(BASE_DIR, item.name);

          // Save as the original extension requested, convert if needed
          const buffer = Buffer.from(b64, "base64");
          fs.writeFileSync(outputPath, buffer);

          const sizeKB = (buffer.length / 1024).toFixed(1);
          console.log(`  OK: ${item.name} (${sizeKB} KB, ${mimeType})`);
          return true;
        }
      }
    }

    console.error(`  NO IMAGE in response for ${item.name}`);
    console.error(`  Response keys: ${JSON.stringify(Object.keys(data))}`);
    if (candidates[0]?.content?.parts) {
      console.error(`  Parts: ${JSON.stringify(candidates[0].content.parts.map(p => Object.keys(p)))}`);
    }
    return false;
  } catch (err) {
    console.error(`  FETCH ERROR: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log("=== AI Training Images (Gemini / Nano Banana) ===\n");

  let ok = 0;
  let fail = 0;

  for (const item of IMAGES) {
    const success = await generateImage(item);
    if (success) ok++;
    else fail++;

    // Small delay to respect rate limits
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log(`\n=== DONE: ${ok} OK, ${fail} failed out of ${IMAGES.length} ===`);

  // List generated files
  const files = fs.readdirSync(BASE_DIR).filter((f) => f.endsWith(".webp") || f.endsWith(".png"));
  console.log("Files in", BASE_DIR);
  for (const f of files) {
    const stat = fs.statSync(path.join(BASE_DIR, f));
    console.log(`  ${f} (${(stat.size / 1024).toFixed(1)} KB)`);
  }
}

main().catch(console.error);
