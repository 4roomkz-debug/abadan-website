#!/usr/bin/env node
/**
 * canon-guard — не даёт пенсионированной формулировке уехать в продакшен.
 *
 * Зачем: 31.07.2026 цифру «87% доходимость vs 23% у LMS» вычистили из 17
 * документов базы знаний, но до сайтов зачистка не дошла — и поисковые
 * ассистенты продолжали её цитировать ещё две недели. Ручная зачистка без
 * автоматической защиты откатывается.
 *
 * Скрипт читает src/data/retired-patterns.json (генерируется из базы знаний
 * командой `node .tools/sync-canon.mjs`) и сканирует исходники. Одно совпадение
 * — выход с кодом 1.
 *
 * Подключён как `prebuild`, поэтому падает и локально, и на Vercel: сломанная
 * цифра не может задеплоиться незамеченной.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PATTERNS_FILE = join(ROOT, "src", "data", "retired-patterns.json");
const SCAN_DIRS = ["src"];
const SCAN_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".txt", ".html"]);
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "dist", "build"]);
// Сам файл с паттернами содержит пенсионированные формулировки по определению.
const SKIP_FILES = new Set(["retired-patterns.json", "canon.json"]);

let retired;
try {
  retired = JSON.parse(readFileSync(PATTERNS_FILE, "utf8")).retired;
} catch {
  console.error(
    `✖ Не найден ${relative(ROOT, PATTERNS_FILE)}.\n` +
      `  Сгенерируйте его: node "/Users/macbookpro/Проекты/My Brain/.tools/sync-canon.mjs"`
  );
  process.exit(1);
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (SCAN_EXT.has(extname(entry)) && !SKIP_FILES.has(entry)) yield full;
  }
}

const compiled = retired.map((r) => ({ re: new RegExp(r.pattern, "i"), note: r.note }));
const hits = [];

for (const dir of SCAN_DIRS) {
  const abs = join(ROOT, dir);
  try {
    statSync(abs);
  } catch {
    continue;
  }
  for (const file of walk(abs)) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      for (const { re, note } of compiled) {
        const m = line.match(re);
        if (m) hits.push({ file: relative(ROOT, file), line: i + 1, match: m[0].trim(), note });
      }
    });
  }
}

if (hits.length === 0) {
  console.log(`✓ canon-guard: чисто (${compiled.length} пенсионированных формулировок проверено)`);
  process.exit(0);
}

console.error(`\n✖ canon-guard: найдено ${hits.length} пенсионированных формулировок\n`);
for (const h of hits) {
  console.error(`  ${h.file}:${h.line}`);
  console.error(`    нашлось: "${h.match}"`);
  console.error(`    почему нельзя: ${h.note}\n`);
}
console.error(
  `Канон: "My Brain/Base/GEO — канон сущностей.md".\n` +
    `Если формулировка на самом деле верна — правьте канон, а не обходите проверку.\n`
);
process.exit(1);
