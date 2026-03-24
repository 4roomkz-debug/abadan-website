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

function download(url, path) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, path).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(path);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

// Convert local image to base64 data URI for Replicate
function imageToDataURI(filePath) {
  const data = fs.readFileSync(filePath);
  const base64 = data.toString('base64');
  return 'data:image/webp;base64,' + base64;
}

async function genVideo(imagePath, prompt, outPath) {
  const name = outPath.split('/').pop();
  console.log(`\nGenerating video: ${name}`);
  console.log(`  From: ${imagePath.split('/').pop()}`);

  const imageDataURI = imageToDataURI(imagePath);

  const pred = await fetchJSON('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    body: JSON.stringify({
      version: VER,
      input: {
        image: imageDataURI,
        prompt: prompt,
        aspect_ratio: '16:9',
        sample_steps: 30,
        sample_guide_scale: 5,
        fast_mode: 'Balanced'
      }
    })
  });

  if (!pred.id) {
    console.log('  ERROR:', pred.detail || pred.title || 'unknown error');
    return false;
  }
  console.log('  Prediction ID:', pred.id);

  let status = 'starting';
  let result;
  let elapsed = 0;
  while (status === 'starting' || status === 'processing') {
    await new Promise(r => setTimeout(r, 5000));
    elapsed += 5;
    result = await fetchJSON('https://api.replicate.com/v1/predictions/' + pred.id);
    status = result.status;
    if (elapsed % 15 === 0) console.log(`  Status: ${status} (${elapsed}s)`);
  }

  if (status === 'succeeded' && result.output) {
    const url = typeof result.output === 'string' ? result.output : result.output;
    console.log('  Downloading video...');

    // Download with curl for reliability
    execSync(`curl -s -L -o "${outPath}" "${url}"`);
    const size = fs.statSync(outPath).size;
    console.log(`  OK: ${name} (${(size / 1024 / 1024).toFixed(1)}MB)`);
    return true;
  } else {
    console.log('  FAILED:', status, result.error);
    return false;
  }
}

const imgBase = '/Users/macbookpro/Проекты/Сайт Abadan/public/images';
const vidBase = '/Users/macbookpro/Проекты/Сайт Abadan/public/videos';

// Ensure videos directory exists
if (!fs.existsSync(vidBase)) fs.mkdirSync(vidBase, { recursive: true });

const pages = [
  {
    name: 'hr',
    image: imgBase + '/hr/hero-poster.webp',
    prompt: 'Slow cinematic camera pan across modern HR office, professionals in meeting room discussing documents, warm natural lighting, subtle movement of people, corporate atmosphere, smooth motion',
    output: vidBase + '/hr-hero.mp4'
  },
  {
    name: 'pravo',
    image: imgBase + '/pravo/hero-poster.webp',
    prompt: 'Slow cinematic camera movement in law office, bookshelves with legal volumes, warm dramatic lighting, dust particles in sunlight, subtle gavel movement, professional legal atmosphere',
    output: vidBase + '/pravo-hero.mp4'
  },
  {
    name: 'finansy',
    image: imgBase + '/finansy/hero-poster.webp',
    prompt: 'Slow cinematic pan across finance department, screens showing moving financial charts and data, blue ambient glow, professional working at desk, corporate trading floor atmosphere',
    output: vidBase + '/finansy-hero.mp4'
  },
  {
    name: 'liderstvo',
    image: imgBase + '/liderstvo/hero-poster.webp',
    prompt: 'Slow cinematic camera movement in modern glass office, executive speaking to team, golden hour light through panoramic windows, inspiring leadership moment, subtle crowd movement',
    output: vidBase + '/liderstvo-hero.mp4'
  }
];

console.log('=== Generating hero videos for 4 training pages ===');
console.log('Model: wavespeedai/wan-2.1-i2v-720p');
console.log('');

for (const page of pages) {
  console.log(`\n=== ${page.name.toUpperCase()} ===`);
  await genVideo(page.image, page.prompt, page.output);
}

console.log('\n=== ALL DONE ===');
const videos = fs.readdirSync(vidBase).filter(f => f.endsWith('.mp4') && !f.startsWith('neftegaz'));
console.log(`Generated ${videos.length}/4 videos`);
