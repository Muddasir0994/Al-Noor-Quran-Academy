import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ACADEMY_BASE_URL, HREFLANG_ALTERNATES } from '../lib/seoConfig';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  structuredDataType?: 'EducationalOrganization' | 'Course' | 'Article' | 'FAQPage';
  schemaData?: any;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Noor Al-Quran Institute | Certified Online Quran & Tajweed Academy',
  description = 'Learn Quran online with Tajweed from certified male & female teachers. Personalized 1-on-1 classes for kids & adults worldwide with 3-day free trial.',
  canonicalUrl = 'https://noorequraninstitute.me/',
  ogType = 'website',
  ogImage = `${ACADEMY_BASE_URL}/logo.png`,
  structuredDataType = 'EducationalOrganization',
  schemaData
}) => {
  const defaultOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Noor Al-Quran Institute',
    alternateName: 'Noor-e-Quran Institute',
    url: ACADEMY_BASE_URL,
    logo: `${ACADEMY_BASE_URL}/logo.png`,
    description: 'Premier international online Quran academy providing 1-on-1 live classes with certified male and female scholars.',
    sameAs: [
      'https://www.youtube.com/@NooreQuranInstitute',
      'https://www.instagram.com/noore_quraninstitute',
      'https://www.facebook.com/share/14pNXeMTM7o/',
      'https://www.linkedin.com/in/muddasir-hameed'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92-327-4496163',
      contactType: 'Academic Support & Admissions',
      availableLanguage: ['English', 'Urdu', 'Arabic']
    }
  };

  const activeSchema = schemaData || defaultOrgSchema;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* OpenGraph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Noor Al-Quran Institute" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* International Alternates */}
      {HREFLANG_ALTERNATES.map((alt) => (
        <link key={alt.hreflang} rel="alternate" hrefLang={alt.hreflang} href={alt.href} />
      ))}

      {/* Structured Data JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(activeSchema)}
      </script>
    </Helmet>
  );
};
