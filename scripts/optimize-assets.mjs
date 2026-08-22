import sharp from 'sharp';
import fs from 'fs';

async function optimize() {
  console.log('Optimizing logo.webp to 120x120 @ quality 75...');
  if (fs.existsSync('public/branding/logo.png')) {
    const buf = fs.readFileSync('public/branding/logo.png');
    const opt = await sharp(buf)
      .resize(120, 120, { fit: 'inside' })
      .webp({ quality: 75, effort: 6 })
      .toBuffer();
    fs.writeFileSync('public/branding/logo.webp', opt);
    fs.writeFileSync('public/logo.webp', opt);
    console.log('Optimized logo.webp:', (opt.length / 1024).toFixed(1), 'KB');
  }

  console.log('Optimizing hero-banner.webp...');
  if (fs.existsSync('public/images/banners/hero-banner.webp')) {
    const buf = fs.readFileSync('public/images/banners/hero-banner.webp');
    const opt = await sharp(buf)
      .resize(600, 450, { fit: 'cover' })
      .webp({ quality: 60, effort: 6 })
      .toBuffer();
    fs.writeFileSync('public/images/banners/hero-banner.webp', opt);
    console.log('Optimized hero-banner.webp:', (opt.length / 1024).toFixed(1), 'KB');
  }
}

optimize().then(() => console.log('Asset optimization completed.')).catch(console.error);
