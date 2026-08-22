import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputLogo = path.resolve('public/branding/logo.png');
const publicDir = path.resolve('public');
const iconsDir = path.resolve('public/icons');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

async function createWhiteBadge(size) {
  // Create a crisp white background with gold border and centered logo
  const padding = Math.max(2, Math.round(size * 0.08));
  const innerSize = size - padding * 2;
  const radius = Math.round(size * 0.22);
  const strokeWidth = Math.max(1, Math.round(size * 0.04));

  const svgBackground = Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" fill="#FFFFFF"/>
      <rect x="${strokeWidth/2}" y="${strokeWidth/2}" width="${size - strokeWidth}" height="${size - strokeWidth}" rx="${radius}" fill="none" stroke="#B79A62" stroke-width="${strokeWidth}" stroke-opacity="0.8"/>
    </svg>
  `);

  const resizedLogo = await sharp(inputLogo)
    .resize(innerSize, innerSize, { fit: 'contain' })
    .png()
    .toBuffer();

  return await sharp(svgBackground)
    .composite([{ input: resizedLogo, top: padding, left: padding }])
    .png()
    .toBuffer();
}

async function generateAllFavicons() {
  console.log('🖼️ Generating all standard Favicons with White Background...');

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'favicon.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'apple-touch-icon-180x180.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 }
  ];

  for (const s of sizes) {
    const buf = await createWhiteBadge(s.size);
    fs.writeFileSync(path.join(publicDir, s.name), buf);
    fs.writeFileSync(path.join(iconsDir, s.name), buf);
    console.log(`✅ Generated: ${s.name} (${s.size}x${s.size})`);
  }

  // Multi-resolution ICO (16x16, 32x32, 48x48)
  const ico16 = await createWhiteBadge(16);
  const ico32 = await createWhiteBadge(32);
  const ico48 = await createWhiteBadge(48);

  const createIco = (images) => {
    const numImages = images.length;
    const headerSize = 6;
    const dirEntrySize = 16;
    let offset = headerSize + numImages * dirEntrySize;

    const header = Buffer.alloc(headerSize);
    header.writeUInt16LE(0, 0); // Reserved
    header.writeUInt16LE(1, 2); // Type: 1 = ICO
    header.writeUInt16LE(numImages, 4);

    const dirEntries = [];
    const imageBuffers = [];

    for (const img of images) {
      const entry = Buffer.alloc(dirEntrySize);
      entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
      entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
      entry.writeUInt8(0, 2); // Color count
      entry.writeUInt8(0, 3); // Reserved
      entry.writeUInt16LE(1, 4); // Color planes
      entry.writeUInt16LE(32, 6); // Bits per pixel
      entry.writeUInt32LE(img.data.length, 8); // Image size
      entry.writeUInt32LE(offset, 12); // Image offset

      dirEntries.push(entry);
      imageBuffers.push(img.data);
      offset += img.data.length;
    }

    return Buffer.concat([header, ...dirEntries, ...imageBuffers]);
  };

  const icoBuffer = createIco([
    { width: 16, height: 16, data: ico16 },
    { width: 32, height: 32, data: ico32 },
    { width: 48, height: 48, data: ico48 }
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(iconsDir, 'favicon.ico'), icoBuffer);
  console.log('✅ Generated: favicon.ico');

  // Vector SVG Favicon with White Background
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="nqGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2D2B0"/>
      <stop offset="50%" stop-color="#B79A62"/>
      <stop offset="100%" stop-color="#8C6D37"/>
    </linearGradient>
    <filter id="nqGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Clean White Background Container -->
  <rect width="512" height="512" rx="108" fill="#FFFFFF"/>
  <rect x="16" y="16" width="480" height="480" rx="92" fill="none" stroke="url(#nqGold)" stroke-width="12" opacity="0.85"/>

  <!-- Quran Rehal & Crescent Emblem in Emerald & Gold -->
  <g filter="url(#nqGlow)" transform="translate(256, 256)">
    <!-- Crescent Moon Accent -->
    <path d="M -40,-130 A 130,130 0 0 1 120,10 A 110,110 0 0 0 -20,-110 A 130,130 0 0 1 -40,-130 Z" fill="url(#nqGold)"/>
    
    <!-- Open Book Pages Left -->
    <path d="M -12,-30 C -60,-65 -130,-45 -140,-10 C -140,50 -130,85 -12,120 Z" fill="#0B332D"/>
    <!-- Open Book Pages Right -->
    <path d="M 12,-30 C 60,-65 130,-45 140,-10 C 140,50 130,85 12,120 Z" fill="#0B332D"/>

    <!-- Rehal Base Left -->
    <path d="M -10,120 L -90,165 L -115,145 L -20,85 Z" fill="url(#nqGold)"/>
    <!-- Rehal Base Right -->
    <path d="M 10,120 L 90,165 L 115,145 L 20,85 Z" fill="url(#nqGold)"/>

    <!-- Islamic Star / Noor Rays -->
    <circle cx="0" cy="-65" r="14" fill="url(#nqGold)"/>
    <polygon points="0,-90 6,-74 22,-74 10,-63 15,-48 0,-57 -15,-48 -10,-63 -22,-74 -6,-74" fill="url(#nqGold)"/>
  </g>
</svg>`;

  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgFavicon, 'utf-8');
  fs.writeFileSync(path.join(iconsDir, 'favicon.svg'), svgFavicon, 'utf-8');
  console.log('✅ Generated: favicon.svg (Vector White Background)');
}

generateAllFavicons().catch(console.error);
