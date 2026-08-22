import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputLogo = path.resolve('Logo.webp');
const publicDir = path.resolve('public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function generateAllFavicons() {
  console.log('🖼️ Generating all standard Favicons & App Icons from Logo.webp...');

  // 1. Desktop & PWA PNGs
  const targets = [
    { file: 'favicon-16x16.png', size: 16 },
    { file: 'favicon-32x32.png', size: 32 },
    { file: 'favicon-48x48.png', size: 48 },
    { file: 'favicon.png', size: 32 },
    { file: 'apple-touch-icon.png', size: 180 },
    { file: 'apple-touch-icon-180x180.png', size: 180 },
    { file: 'android-chrome-192x192.png', size: 192 },
    { file: 'android-chrome-512x512.png', size: 512 },
    { file: 'logo.png', size: 512 },
    { file: 'logo.webp', size: 512 },
    { file: 'favicon.webp', size: 48 }
  ];

  for (const t of targets) {
    const dest = path.join(publicDir, t.file);
    if (t.file.endsWith('.webp')) {
      await sharp(inputLogo)
        .resize(t.size, t.size, { fit: 'contain', background: { r: 11, g: 51, b: 45, alpha: 0 } })
        .webp({ quality: 95 })
        .toFile(dest);
    } else {
      await sharp(inputLogo)
        .resize(t.size, t.size, { fit: 'contain', background: { r: 11, g: 51, b: 45, alpha: 0 } })
        .png({ quality: 95 })
        .toFile(dest);
    }
    console.log(`✅ Generated: public/${t.file} (${t.size}x${t.size})`);
  }

  // 2. Generate ICO file
  const ico32Buffer = await sharp(inputLogo)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const ico16Buffer = await sharp(inputLogo)
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Create valid ICO buffer containing 16x16 and 32x32 images
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
    { width: 16, height: 16, data: ico16Buffer },
    { width: 32, height: 32, data: ico32Buffer }
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✅ Generated: public/favicon.ico (Multi-resolution ICO 16x16, 32x32)');

  // 3. Generate SVG Logo & Favicon
  const logoBase64 = (await sharp(inputLogo).resize(256, 256, { fit: 'contain' }).png().toBuffer()).toString('base64');
  
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="96" fill="#0B332D"/>
  <rect x="24" y="24" width="464" height="464" rx="72" fill="none" stroke="#B79A62" stroke-width="8" opacity="0.6"/>
  <image href="data:image/png;base64,${logoBase64}" x="56" y="56" width="400" height="400"/>
</svg>`;

  fs.writeFileSync(path.join(publicDir, 'logo.svg'), svgContent, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf-8');
  console.log('✅ Generated: public/logo.svg & public/favicon.svg');

  console.log('🎉 All RealFaviconGenerator requirements successfully met!');
}

generateAllFavicons().catch(err => {
  console.error('❌ Error generating favicons:', err);
  process.exit(1);
});
