/**
 * Centralized Categorized Image Asset Configuration for Noor E Quran Institute
 * 
 * Folder Structure:
 * - `/branding/` -> Official Logo & Seal variants (WebP, PNG, SVG)
 * - `/icons/`    -> Multi-device Favicons, Apple Touch icons, Android PWA icons
 * - `/images/banners/` -> Hero & Specialized Program Banners
 * - `/images/courses/` -> Course Curriculum Illustrations
 * - `/images/faculty/` -> Verified Scholar & Tutor Portraits
 * - `/images/uploads/` -> Dynamic CMS & Blog Uploads
 */

export const IMAGES = {
  // 1. Official Branding & Seals
  branding: {
    logo: '/branding/logo.webp',
    logoPng: '/branding/logo.png',
    logoSvg: '/branding/logo.svg',
    seal: '/branding/logo.webp',
  },

  // 2. Multi-device Favicons & App Icons
  icons: {
    faviconIco: '/icons/favicon.ico',
    faviconSvg: '/icons/favicon.svg',
    favicon16: '/icons/favicon-16x16.png',
    favicon32: '/icons/favicon-32x32.png',
    favicon48: '/icons/favicon-48x48.png',
    appleTouch: '/icons/apple-touch-icon.png',
    appleTouch180: '/icons/apple-touch-icon-180x180.png',
    android192: '/icons/android-chrome-192x192.png',
    android512: '/icons/android-chrome-512x512.png',
  },

  // 3. Hero & Specialized Program Banners
  banners: {
    heroBanner: '/images/banners/hero-banner.webp',
    aboutBanner: '/images/banners/academy-about-banner.webp',
    kidsBanner: '/images/banners/kids-program-banner.webp',
    femaleBanner: '/images/banners/female-program-banner.webp',
    adultsBanner: '/images/banners/adults-program-banner.webp',
  },

  // 4. Course Illustrations & Curriculum
  courses: {
    nooraniQaida: '/images/courses/course-noorani-qaida.webp',
    tajweed: '/images/courses/course-nazra-tajweed.webp',
    hifz: '/images/courses/course-hifz.webp',
    nazra: '/images/courses/course-nazra-tajweed.webp',
    islamicStudies: '/images/banners/academy-about-banner.webp',
    femaleTutors: '/images/banners/female-program-banner.webp',
    adults: '/images/banners/adults-program-banner.webp',
  },

  // 5. Faculty / Scholars (Certified Tutors)
  faculty: {
    bilal: '/images/faculty/tutor-bilal.webp',
    maryam: '/images/faculty/tutor-maryam.webp',
    ayesha: '/images/faculty/tutor-ayesha.webp',
    tariq: '/images/faculty/tutor-tariq.webp',
  },

  // 6. Legacy & Convenience Shortcuts
  logo: '/branding/logo.webp',
  logoPng: '/branding/logo.png',
  favicon: '/icons/favicon.png',
  tutors: {
    bilal: '/images/faculty/tutor-bilal.webp',
    maryam: '/images/faculty/tutor-maryam.webp',
    ayesha: '/images/faculty/tutor-ayesha.webp',
    tariq: '/images/faculty/tutor-tariq.webp',
  }
} as const;

export default IMAGES;
