#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = "AIzaSyAmKhpGKdKAuIb_JPqNMvUCds27Wd5Jmwo";
const MODEL = "gemini-2.5-flash-image";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const BASE_DIR = path.resolve(__dirname, "../public/images/blog");

if (!fs.existsSync(BASE_DIR)) fs.mkdirSync(BASE_DIR, { recursive: true });

const IMAGES = [
  { name: "ai-hr-kazakhstan.webp", prompt: "Modern office scene, AI interface on computer screen showing HR analytics dashboard, Central Asian HR professional analyzing data, teal and blue ambient lighting, photorealistic" },
  { name: "trudovoy-kodeks-rk-2026.webp", prompt: "Legal documents and Kazakhstan labor code books on desk, scales of justice, pen signing official papers, warm professional lighting, photorealistic" },
  { name: "roi-korporativnogo-obucheniya.webp", prompt: "Business ROI charts and graphs on screen, corporate training room, financial metrics dashboard, Central Asian professional presenting, modern office, photorealistic" },
  { name: "5-navykov-lidera.webp", prompt: "Inspiring leadership moment, executive leading team meeting, modern glass conference room, Central Asian business leader, warm golden hour lighting, cinematic, photorealistic" },
  { name: "greydirovanie-dolzhnostey.webp", prompt: "HR grading system diagram on whiteboard, organizational structure chart, Central Asian HR professionals in meeting, oil and gas company office, photorealistic" },
  { name: "prompt-engineering-hr.webp", prompt: "AI chatbot interface on laptop screen with HR prompts visible, modern workspace, Central Asian woman typing, teal accent lighting, tech-savvy atmosphere, photorealistic" },
  { name: "byudzhet-na-obuchenie.webp", prompt: "Financial budget planning spreadsheets, calculator, training cost analysis on screen, Central Asian finance director at desk, professional office, photorealistic" },
  { name: "tsifrovaya-transformatsiya-hr.webp", prompt: "Digital transformation journey, old paper files transitioning to digital screens, modern HR tech dashboard, Central Asian professionals, before-and-after concept, photorealistic" },
  { name: "promyshlennaya-bezopasnost-rk-2026.webp", prompt: "Industrial safety in oil and gas, workers in orange PPE and hard hats near oil refinery, safety warning signs, Kazakhstan steppe background, dramatic sky, photorealistic" },
  { name: "obyazatelnoe-obuchenie-neftegaz-rk.webp", prompt: "Mandatory training checklist on clipboard, oil rig workers in safety gear attending briefing, Kazakhstan oil field, compliance documents, photorealistic" },
  { name: "top-10-sertifikatsiy-neftegaz-kz.webp", prompt: "Professional certificates and diplomas displayed on desk, NEBOSH and IWCF logos visible, oil industry background, Central Asian engineer proudly holding certificate, photorealistic" },
  { name: "tsifrovaya-transformatsiya-neftegaz-2026.webp", prompt: "Digital twin of oil refinery on large screen, IoT sensors data flowing, Central Asian engineers using tablets at modern control room, futuristic blue holographic elements, photorealistic" },
  { name: "mikroobuchenie-telegram-vovlechennost.webp", prompt: "Smartphone showing Telegram chat with educational lesson cards, Central Asian professional learning on phone during break, modern office cafeteria, warm lighting, photorealistic" },
  { name: "mikroobuchenie-vs-traditsionnoe.webp", prompt: "Split comparison: left side traditional classroom with bored students, right side mobile phone with engaging microlearning app, vibrant contrast, modern infographic style, photorealistic" },
  { name: "5-prichin-ot-lms-k-mikroobucheniyu.webp", prompt: "Old desktop computer showing clunky LMS interface fading away, modern smartphone with sleek messenger-based learning glowing brightly, transition concept, teal and gold accents, photorealistic" },
  { name: "obuchenie-soft-skills-bez-trenera.webp", prompt: "AI avatar on phone screen giving feedback to professional, virtual coaching session, Central Asian woman practicing communication skills with AI, soft purple and teal lighting, photorealistic" },
];

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
    if (!res.ok) { console.error(`  ERROR ${res.status}: ${(await res.text()).slice(0,200)}`); return false; }
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
  } catch (e) { console.error(`  ERROR: ${e.message}`); return false; }
}

console.log("=== Blog Images (Gemini) ===\n");
let ok = 0;
for (const img of IMAGES) {
  if (await gen(img)) ok++;
  await new Promise(r => setTimeout(r, 2000));
}
console.log(`\n=== DONE: ${ok}/${IMAGES.length} ===`);
