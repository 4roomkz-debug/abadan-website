#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = "AIzaSyAmKhpGKdKAuIb_JPqNMvUCds27Wd5Jmwo";
const MODEL = "gemini-2.5-flash-image";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const BASE_DIR = path.resolve(__dirname, "../public/images/blog");

const IMAGES = [
  { name: "promyshlennaya-bezopasnost-rk-2026.webp", prompt: "Industrial safety in oil and gas, workers in orange PPE and hard hats near oil refinery, safety warning signs, Kazakhstan steppe background, dramatic sky, photorealistic, 1200x630" },
  { name: "obyazatelnoe-obuchenie-neftegaz-rk.webp", prompt: "Mandatory training checklist on clipboard, oil rig workers in safety gear attending briefing, Kazakhstan oil field, compliance documents, photorealistic, 1200x630" },
  { name: "top-10-sertifikatsiy-neftegaz-kz.webp", prompt: "Professional certificates and diplomas displayed on desk, NEBOSH and IWCF logos, oil industry background, engineer holding certificate, photorealistic, 1200x630" },
  { name: "tsifrovaya-transformatsiya-neftegaz-2026.webp", prompt: "Digital twin of oil refinery on large screen, IoT sensors data flowing, engineers using tablets at modern control room, futuristic blue holographic elements, photorealistic, 1200x630" },
  { name: "mikroobuchenie-telegram-vovlechennost.webp", prompt: "Smartphone showing Telegram chat with educational lesson cards, professional learning on phone during coffee break, modern office, warm lighting, photorealistic, 1200x630" },
  { name: "mikroobuchenie-vs-traditsionnoe.webp", prompt: "Split comparison: left side traditional classroom, right side mobile phone with engaging microlearning app, vibrant contrast, modern infographic style, photorealistic, 1200x630" },
  { name: "5-prichin-ot-lms-k-mikroobucheniyu.webp", prompt: "Old desktop showing clunky LMS interface fading, modern smartphone with messenger-based learning glowing brightly, transition concept, teal and gold accents, photorealistic, 1200x630" },
  { name: "obuchenie-soft-skills-bez-trenera.webp", prompt: "AI avatar on phone screen giving feedback, virtual coaching session, woman practicing communication skills with AI, soft purple and teal lighting, photorealistic, 1200x630" },
];

// Skip already existing
const existing = fs.readdirSync(BASE_DIR);
const toGenerate = IMAGES.filter(img => !existing.includes(img.name));

if (toGenerate.length === 0) {
  console.log("All images already exist!");
  process.exit(0);
}

async function gen(item) {
  console.log(`  Generating: ${item.name}...`);
  try {
    const res = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: item.prompt }] }],
        generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
      }),
    });
    if (!res.ok) {
      const txt = await res.text();
      console.error(`  ERROR ${res.status}: ${txt.slice(0, 300)}`);
      return false;
    }
    const data = await res.json();
    for (const c of (data.candidates || [])) {
      for (const p of (c.content?.parts || [])) {
        if (p.inlineData) {
          fs.writeFileSync(path.join(BASE_DIR, item.name), Buffer.from(p.inlineData.data, "base64"));
          console.log(`  OK: ${item.name}`);
          return true;
        }
      }
    }
    console.error(`  NO IMAGE for ${item.name}`);
    return false;
  } catch (e) {
    console.error(`  ERROR: ${e.message}`);
    return false;
  }
}

console.log(`=== Generating ${toGenerate.length} missing blog images ===\n`);
let ok = 0;
for (const img of toGenerate) {
  if (await gen(img)) ok++;
  await new Promise(r => setTimeout(r, 3000));
}
console.log(`\n=== DONE: ${ok}/${toGenerate.length} ===`);
