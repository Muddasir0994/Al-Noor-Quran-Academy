import sharp from 'sharp';
import fs from 'fs';

async function optimize() {
  console.log('Optimizing logo.webp to 160x160 @ quality 75...');
  if (fs.existsSync('public/branding/logo.png')) {
    const buf = fs.readFileSync('public/branding/logo.png');
    const opt = await sharp(buf)
      .resize(160, 160, { fit: 'inside' })
      .webp({ quality: 75, effort: 6 })
      .toBuffer();
    fs.writeFileSync('public/branding/logo.webp', opt);
    console.log('Optimized logo.webp:', (opt.length / 1024).toFixed(1), 'KB');
  }

  console.log('Optimizing hero-banner.webp...');
  if (fs.existsSync('public/images/banners/hero-banner.webp')) {
    const buf = fs.readFileSync('public/images/banners/hero-banner.webp');
    const opt = await sharp(buf)
      .resize(750, 560, { fit: 'cover' })
      .webp({ quality: 70, effort: 6 })
      .toBuffer();
    fs.writeFileSync('public/images/banners/hero-banner.webp', opt);
    console.log('Optimized hero-banner.webp:', (opt.length / 1024).toFixed(1), 'KB');
  }
}

optimize().then(() => console.log('Image compression completed.')).catch(console.error);
