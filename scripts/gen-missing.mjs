import https from 'https';
import fs from 'fs';

const API = 'r8_6Fc9FaTtcGNRKAfRODXFuCoApVLShFX2PxcPX';
const VER = '4139a7655e86b5d2f51450b52491369ec5b1250ff9af033f5de28cd121c24906';

function fetchJSON(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname, path: u.pathname + u.search,
      method: opts.method || 'GET',
      headers: { 'Authorization': 'Bearer ' + API, 'Content-Type': 'application/json' }
    }, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d))); });
    req.on('error', reject);
    if (opts.body) req.write(opts.body);
    req.end();
  });
}

function download(url, path) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, path).then(resolve);
      }
      const file = fs.createWriteStream(path);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

async function gen(prompt, outPath, aspect) {
  console.log('Generating:', outPath.split('/').pop());
  const pred = await fetchJSON('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    body: JSON.stringify({ version: VER, input: { prompt, aspect_ratio: aspect, output_format: 'webp', output_quality: 85, steps: 25 } })
  });
  if (!pred.id) { console.log('ERROR:', pred.detail); return; }

  let status = 'starting';
  let result;
  while (status === 'starting' || status === 'processing') {
    await new Promise(r => setTimeout(r, 3000));
    result = await fetchJSON('https://api.replicate.com/v1/predictions/' + pred.id);
    status = result.status;
  }

  if (status === 'succeeded' && result.output) {
    const url = Array.isArray(result.output) ? result.output[0] : result.output;
    await download(url, outPath);
    const size = fs.statSync(outPath).size;
    console.log('OK:', Math.round(size / 1024) + 'K');
  } else {
    console.log('FAILED:', status, result.error);
  }
}

const base = '/Users/macbookpro/Проекты/Сайт Abadan/public/images';

await gen('Professional headshot Central Asian woman 40s confident smile dark blazer modern office background corporate portrait warm lighting photorealistic', base + '/hr/person-1.webp', '1:1');
await gen('Professional headshot Central Asian woman 30s friendly expression teal blouse corporate background portrait natural light photorealistic', base + '/hr/person-2.webp', '1:1');
await gen('Professional headshot Central Asian man 30s confident look white shirt dark jacket office background corporate portrait studio lighting photorealistic', base + '/hr/person-3.webp', '1:1');
await gen('Modern law office with bookshelves of legal volumes scales of justice gavel on desk warm dramatic lighting dark wood leather chairs cinematic photorealistic', base + '/pravo/hero-poster.webp', '16:9');

console.log('ALL DONE');
