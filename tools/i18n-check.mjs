#!/usr/bin/env node
/**
 * i18n-check — сколько ключей kk и en ещё не переведено.
 *
 * Непереведённый ключ на сайте показывается по-русски (src/messages/index.ts),
 * поэтому дыра в переводе не роняет сборку и её легко не заметить. Скрипт
 * сравнивает каждый src/messages/<locale>/*.json с русским и печатает
 * недостающие ключи. С флагом --strict выходит с кодом 1 — для проверки
 * перед снятием noindex с языка.
 */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "messages");
const strict = process.argv.includes("--strict");

function keys(obj, prefix = "") {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v) ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`]
  );
}

const read = (locale, file) => {
  try {
    return JSON.parse(readFileSync(join(DIR, locale, file), "utf8"));
  } catch {
    return {};
  }
};

let missingTotal = 0;
const namespaces = readdirSync(join(DIR, "ru")).filter((f) => f.endsWith(".json"));

for (const locale of ["kk", "en"]) {
  let missing = [];
  let total = 0;
  for (const file of namespaces) {
    const ru = keys(read("ru", file));
    const own = new Set(keys(read(locale, file)));
    total += ru.length;
    missing = missing.concat(ru.filter((k) => !own.has(k)).map((k) => `${file.replace(".json", "")}.${k}`));
  }
  missingTotal += missing.length;
  console.log(`${locale}: переведено ${total - missing.length} из ${total}`);
  for (const k of missing.slice(0, 20)) console.log(`  − ${k}`);
  if (missing.length > 20) console.log(`  … и ещё ${missing.length - 20}`);
}

if (strict && missingTotal > 0) process.exit(1);
