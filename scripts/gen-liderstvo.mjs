import https from 'https';
import fs from 'fs';
import { execSync } from 'child_process';

const API = 'r8_6Fc9FaTtcGNRKAfRODXFuCoApVLShFX2PxcPX';
const VER = '1f0a7fa066689a087b597a314f60ef74d1a720fa1fb9a7083487c4b01db3395f';

function fetchJSON(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname, path: u.pathname + u.search,
      method: opts.method || 'GET',
      headers: { 'Authorization': 'Bearer ' + API, 'Content-Type': 'application/json' }
    }, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { reject(e); } }); });
    req.on('error', reject);
    if (opts.body) req.write(opts.body);
    req.end();
  });
}

const imgPath = '/Users/macbookpro/Проекты/Сайт Abadan/public/images/liderstvo/hero-poster.webp';
const outPath = '/Users/macbookpro/Проекты/Сайт Abadan/public/videos/liderstvo-hero.mp4';

const data = fs.readFileSync(imgPath);
const imageDataURI = 'data:image/webp;base64,' + data.toString('base64');

console.log('Starting liderstvo video generation...');

const pred = await fetchJSON('https://api.replicate.com/v1/predictions', {
  method: 'POST',
  body: JSON.stringify({
    version: VER,
    input: {
      image: imageDataURI,
      prompt: 'Slow cinematic camera movement in modern glass office, executive speaking to team, golden hour light through panoramic windows, inspiring leadership moment, subtle crowd movement',
      aspect_ratio: '16:9',
      sample_steps: 30,
      sample_guide_scale: 5,
      fast_mode: 'Balanced'
    }
  })
});

if (pred.detail || pred.title) { console.log('ERROR:', pred.detail || pred.title); process.exit(1); }
console.log('Prediction ID:', pred.id);

let status = 'starting';
let result;
while (status === 'starting' || status === 'processing') {
  await new Promise(r => setTimeout(r, 5000));
  result = await fetchJSON('https://api.replicate.com/v1/predictions/' + pred.id);
  status = result.status;
  console.log('Status:', status);
}

if (status === 'succeeded' && result.output) {
  const url = typeof result.output === 'string' ? result.output : result.output;
  execSync(`curl -s -L -o "${outPath}" "${url}"`);
  const size = fs.statSync(outPath).size;
  console.log('Done:', (size / 1024 / 1024).toFixed(1) + 'MB');
} else {
  console.log('FAILED:', status, result.error);
}
