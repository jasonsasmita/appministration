/**
 * Generates the abstract placeholder artwork for the dummy project catalog.
 *
 * Run once from the repository root:
 *   node scripts/generate-project-images.mjs
 *
 * The output is committed to public/images/projects, so the app never needs
 * to run this at build or request time.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 675;
const OUTPUT_DIR = path.resolve(process.cwd(), 'public/images/projects');

const palettes = [
  ['#070b1f', '#1e1b4b', '#6366f1', '#22d3ee'],
  ['#0f0717', '#3b0764', '#a855f7', '#f472b6'],
  ['#0b0a06', '#3f1d0b', '#f59e0b', '#fb7185'],
  ['#04120f', '#064e3b', '#10b981', '#67e8f9'],
  ['#081018', '#0c4a6e', '#0ea5e9', '#a5b4fc'],
  ['#120a0a', '#450a0a', '#ef4444', '#fbbf24'],
];

// variants: total images per project (cover + gallery frames).
// 0 keeps the project image-less so the detail page empty state is covered.
const projects = [
  { slug: 'aurora-notes', variants: 3 },
  { slug: 'signal-ledger', variants: 0 },
  { slug: 'relay-board', variants: 1 },
  { slug: 'atlas-index', variants: 1 },
  { slug: 'orbit-runner', variants: 3 },
  { slug: 'tidepool', variants: 3 },
  { slug: 'glyph-garden', variants: 1 },
  { slug: 'lumen-icons', variants: 0 },
  { slug: 'paper-sunset', variants: 1 },
  { slug: 'mono-motion', variants: 1 },
  { slug: 'pixel-forge', variants: 3 },
  { slug: 'commit-lens', variants: 1 },
  { slug: 'tidy-tabs', variants: 1 },
  { slug: 'trailmark', variants: 1 },
  { slug: 'pantry-pal', variants: 1 },
  { slug: 'night-shift', variants: 1 },
  { slug: 'field-notes', variants: 1 },
  { slug: 'mod-pod', variants: 1 },
];

function hashString(value) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createRandom(seed) {
  let state = seed >>> 0;

  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function createArtwork(slug, variant, paletteIndex) {
  const random = createRandom(hashString(`${slug}:${variant}`));
  const [background, midtone, accent, highlight] =
    palettes[paletteIndex % palettes.length];
  const angle = Math.round(70 + random() * 110);

  const orbs = Array.from({ length: 3 }, () => ({
    x: Math.round(-80 + random() * (WIDTH + 160)),
    y: Math.round(-80 + random() * (HEIGHT + 160)),
    radius: Math.round(160 + random() * 240),
    color: random() > 0.45 ? accent : highlight,
    opacity: (0.28 + random() * 0.22).toFixed(2),
  }));

  const ring = {
    x: Math.round(180 + random() * (WIDTH - 360)),
    y: Math.round(120 + random() * (HEIGHT - 240)),
    radius: Math.round(90 + random() * 170),
  };

  const stars = Array.from({ length: 58 }, () => {
    const x = (random() * WIDTH).toFixed(1);
    const y = (random() * HEIGHT).toFixed(1);
    const radius = (0.3 + random() * 1.2).toFixed(2);
    const opacity = (0.2 + random() * 0.55).toFixed(2);

    return `<circle cx="${x}" cy="${y}" r="${radius}" fill="#ffffff" opacity="${opacity}" />`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(${angle} 0.5 0.5)">
      <stop offset="0%" stop-color="${background}" />
      <stop offset="52%" stop-color="${midtone}" />
      <stop offset="100%" stop-color="${background}" />
    </linearGradient>
    <radialGradient id="vignette" cx="50%" cy="46%" r="78%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0" />
      <stop offset="68%" stop-color="#000000" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#02030a" stop-opacity="0.72" />
    </radialGradient>
    <filter id="soft-blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="72" />
    </filter>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" stitchTiles="stitch" result="noise" />
      <feColorMatrix in="noise" type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.14" />
      </feComponentTransfer>
    </filter>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1" />
    </pattern>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#base)" />

  <g filter="url(#soft-blur)">
    ${orbs
      .map(
        (orb) =>
          `<circle cx="${orb.x}" cy="${orb.y}" r="${orb.radius}" fill="${orb.color}" opacity="${orb.opacity}" />`,
      )
      .join('\n    ')}
  </g>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)" opacity="0.55" />

  <g fill="none" stroke="${highlight}">
    <circle cx="${ring.x}" cy="${ring.y}" r="${ring.radius}" stroke-opacity="0.22" stroke-width="1.5" />
    <circle cx="${ring.x}" cy="${ring.y}" r="${ring.radius + 58}" stroke-opacity="0.1" stroke-width="1" />
    <circle cx="${ring.x}" cy="${ring.y}" r="${ring.radius + 124}" stroke-opacity="0.06" stroke-width="1" />
  </g>

  <g>${stars}</g>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#vignette)" />
  <rect width="${WIDTH}" height="${HEIGHT}" filter="url(#grain)" opacity="0.5" />
</svg>`;
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  let generated = 0;

  for (const [index, project] of projects.entries()) {
    if (project.variants === 0) continue;

    for (let variant = 0; variant < project.variants; variant += 1) {
      const filename =
        variant === 0
          ? `${project.slug}.jpg`
          : `${project.slug}-${variant + 1}.jpg`;
      const outputPath = path.join(OUTPUT_DIR, filename);

      await sharp(
        Buffer.from(createArtwork(project.slug, variant, index)),
      )
        .jpeg({ quality: 82, chromaSubsampling: '4:2:0' })
        .toFile(outputPath);

      generated += 1;
      console.log(`generated ${filename}`);
    }
  }

  console.log(`\nDone: ${generated} images written to ${OUTPUT_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
