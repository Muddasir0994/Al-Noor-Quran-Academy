import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');

// Image sizing and quality specifications based on maximum display dimensions in UI
const SPECS = {
  // Main logo (displayed at max 48-64px, retina 128px, modal max 192px)
  'logo.png': { maxWidth: 512, quality: 85, isPng: true },
  'images/logo.png': { maxWidth: 512, quality: 85, isPng: true },

  // Hero & large landing banners (max display 1200px)
  'images/hero-banner.jpg': { maxWidth: 1200, quality: 82 },
  'images/academy-about-banner.jpg': { maxWidth: 1200, quality: 82 },
  'images/kids-program-banner.jpg': { maxWidth: 1200, quality: 82 },
  'images/female-program-banner.jpg': { maxWidth: 1200, quality: 82 },
  'images/adults-program-banner.jpg': { maxWidth: 1200, quality: 82 },

  // Course cards (max display 400-600px width on desktop)
  'images/course-noorani-qaida.jpg': { maxWidth: 800, quality: 80 },
  'images/course-nazra-tajweed.jpg': { maxWidth: 800, quality: 80 },
  'images/course-hifz.jpg': { maxWidth: 800, quality: 80 },

  // Tutor portraits (max display 120-250px width in cards)
  'images/tutor-bilal.jpg': { maxWidth: 500, quality: 80 },
  'images/tutor-maryam.jpg': { maxWidth: 500, quality: 80 },
  'images/tutor-ayesha.jpg': { maxWidth: 500, quality: 80 },
  'images/tutor-tariq.jpg': { maxWidth: 500, quality: 80 },
};

async function optimizeAll() {
  console.log('--- Starting Al-Noor Image Optimization & WebP Conversion ---\n');

  let totalBeforeBytes = 0;
  let totalAfterWebpBytes = 0;
  let totalAfterFallbackBytes = 0;

  for (const [relPath, config] of Object.entries(SPECS)) {
    const inputPath = path.join(PUBLIC_DIR, relPath);
    if (!fs.existsSync(inputPath)) {
      console.warn(`File not found: ${inputPath}`);
      continue;
    }

    const beforeStat = fs.statSync(inputPath);
    totalBeforeBytes += beforeStat.size;
    const beforeKb = (beforeStat.size / 1024).toFixed(1);

    // Read buffer to avoid Windows file lock issues
    const inputBuffer = fs.readFileSync(inputPath);

    const parsed = path.parse(inputPath);
    const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);

    const imageInstance = sharp(inputBuffer);
    const metadata = await imageInstance.metadata();
    const targetWidth = Math.min(metadata.width || config.maxWidth, config.maxWidth);

    // 1. Generate WebP Buffer and write
    const webpBuffer = await sharp(inputBuffer)
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: config.quality, effort: 6 })
      .toBuffer();
    fs.writeFileSync(webpPath, webpBuffer);

    const webpStat = fs.statSync(webpPath);
    totalAfterWebpBytes += webpStat.size;
    const webpKb = (webpStat.size / 1024).toFixed(1);

    // 2. Compress fallback format (JPEG / PNG)
    let fallbackBuffer;
    if (config.isPng) {
      fallbackBuffer = await sharp(inputBuffer)
        .resize({ width: targetWidth, withoutEnlargement: true })
        .png({ quality: config.quality, compressionLevel: 9 })
        .toBuffer();
    } else {
      fallbackBuffer = await sharp(inputBuffer)
        .resize({ width: targetWidth, withoutEnlargement: true })
        .jpeg({ quality: config.quality, progressive: true, mozjpeg: true })
        .toBuffer();
    }
    fs.writeFileSync(inputPath, fallbackBuffer);

    const fallbackStat = fs.statSync(inputPath);
    totalAfterFallbackBytes += fallbackStat.size;
    const fallbackKb = (fallbackStat.size / 1024).toFixed(1);

    const savingsPercent = (((beforeStat.size - webpStat.size) / beforeStat.size) * 100).toFixed(1);

    console.log(
      `✓ ${relPath.padEnd(32)}: ${beforeKb.padStart(7)} KB → WebP: ${webpKb.padStart(6)} KB (fallback: ${fallbackKb.padStart(6)} KB) [${savingsPercent}% reduction]`
    );
  }

  const totalBeforeMb = (totalBeforeBytes / (1024 * 1024)).toFixed(2);
  const totalWebpMb = (totalAfterWebpBytes / (1024 * 1024)).toFixed(2);
  const totalFallbackMb = (totalAfterFallbackBytes / (1024 * 1024)).toFixed(2);
  const overallSavingsPercent = (((totalBeforeBytes - totalAfterWebpBytes) / totalBeforeBytes) * 100).toFixed(1);

  console.log('\n======================================================');
  console.log(`TOTAL IMAGE PAYLOAD (BEFORE) : ${totalBeforeMb} MB (${totalBeforeBytes.toLocaleString()} bytes)`);
  console.log(`TOTAL WEBP PAYLOAD  (AFTER)  : ${totalWebpMb} MB (${totalAfterWebpBytes.toLocaleString()} bytes)`);
  console.log(`TOTAL FALLBACK PAYLOAD       : ${totalFallbackMb} MB (${totalAfterFallbackBytes.toLocaleString()} bytes)`);
  console.log(`TOTAL BANDWIDTH REDUCTION    : ${overallSavingsPercent}% SAVINGS!`);
  console.log('======================================================\n');
}

optimizeAll().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
