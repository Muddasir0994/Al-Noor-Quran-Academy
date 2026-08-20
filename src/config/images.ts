/**
 * Centralized Image Asset Configuration for Noor-e-Quran Institute
 * 
 * Optimized WebP format with high-fidelity compression for maximum performance.
 * All image assets reside in `/public/images/`.
 */

export const IMAGES = {
  // Official Logo & Favicon - Single Source of Truth
  logo: '/logo.webp',
  logoPng: '/logo.png',
  favicon: '/logo.png',

  // Course Illustrations & Banners (Optimized WebP)
  courses: {
    nooraniQaida: '/images/course-noorani-qaida.webp',
    tajweed: '/images/course-nazra-tajweed.webp',
    hifz: '/images/course-hifz.webp',
    nazra: '/images/course-nazra-tajweed.webp',
    islamicStudies: '/images/academy-about-banner.webp',
    femaleTutors: '/images/female-program-banner.webp',
    adults: '/images/adults-program-banner.webp',
  },

  // Faculty / Scholars (Optimized WebP)
  tutors: {
    bilal: '/images/tutor-bilal.webp',
    maryam: '/images/tutor-maryam.webp',
    ayesha: '/images/tutor-ayesha.webp',
    tariq: '/images/tutor-tariq.webp',
  },

  // Banners & Backgrounds
  banners: {
    heroBanner: '/images/hero-banner.webp',
    aboutBanner: '/images/academy-about-banner.webp',
    kidsBanner: '/images/kids-program-banner.webp',
    femaleBanner: '/images/female-program-banner.webp',
    adultsBanner: '/images/adults-program-banner.webp',
  }
} as const;

export default IMAGES;
