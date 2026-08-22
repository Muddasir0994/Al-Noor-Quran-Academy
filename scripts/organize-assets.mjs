import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');

const folders = [
  'public/branding',
  'public/icons',
  'public/images/banners',
  'public/images/courses',
  'public/images/faculty',
  'public/images/uploads'
];

folders.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('📁 Created folder:', dir);
  }
});

// Copy files into categorical hierarchy
const mappings = [
  // Branding
  { src: 'public/logo.webp', dest: 'public/branding/logo.webp' },
  { src: 'public/logo.png', dest: 'public/branding/logo.png' },
  { src: 'public/logo.svg', dest: 'public/branding/logo.svg' },

  // Icons
  { src: 'public/favicon.ico', dest: 'public/icons/favicon.ico' },
  { src: 'public/favicon.svg', dest: 'public/icons/favicon.svg' },
  { src: 'public/favicon-16x16.png', dest: 'public/icons/favicon-16x16.png' },
  { src: 'public/favicon-32x32.png', dest: 'public/icons/favicon-32x32.png' },
  { src: 'public/favicon-48x48.png', dest: 'public/icons/favicon-48x48.png' },
  { src: 'public/apple-touch-icon.png', dest: 'public/icons/apple-touch-icon.png' },
  { src: 'public/apple-touch-icon-180x180.png', dest: 'public/icons/apple-touch-icon-180x180.png' },
  { src: 'public/android-chrome-192x192.png', dest: 'public/icons/android-chrome-192x192.png' },
  { src: 'public/android-chrome-512x512.png', dest: 'public/icons/android-chrome-512x512.png' },

  // Banners
  { src: 'public/images/hero-banner.webp', dest: 'public/images/banners/hero-banner.webp' },
  { src: 'public/images/academy-about-banner.webp', dest: 'public/images/banners/academy-about-banner.webp' },
  { src: 'public/images/kids-program-banner.webp', dest: 'public/images/banners/kids-program-banner.webp' },
  { src: 'public/images/female-program-banner.webp', dest: 'public/images/banners/female-program-banner.webp' },
  { src: 'public/images/adults-program-banner.webp', dest: 'public/images/banners/adults-program-banner.webp' },

  // Courses
  { src: 'public/images/course-noorani-qaida.webp', dest: 'public/images/courses/course-noorani-qaida.webp' },
  { src: 'public/images/course-nazra-tajweed.webp', dest: 'public/images/courses/course-nazra-tajweed.webp' },
  { src: 'public/images/course-hifz.webp', dest: 'public/images/courses/course-hifz.webp' },

  // Faculty
  { src: 'public/images/tutor-bilal.webp', dest: 'public/images/faculty/tutor-bilal.webp' },
  { src: 'public/images/tutor-maryam.webp', dest: 'public/images/faculty/tutor-maryam.webp' },
  { src: 'public/images/tutor-ayesha.webp', dest: 'public/images/faculty/tutor-ayesha.webp' },
  { src: 'public/images/tutor-tariq.webp', dest: 'public/images/faculty/tutor-tariq.webp' }
];

mappings.forEach(({ src, dest }) => {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ Categorized: ${src} -> ${dest}`);
  }
});

console.log('🎉 Asset folder hierarchy organized successfully!');
