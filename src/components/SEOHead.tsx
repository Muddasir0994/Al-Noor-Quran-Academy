import React, { useEffect } from 'react';
import { SEO_PAGE_MAP, ACADEMY_BASE_URL, HREFLANG_ALTERNATES } from '../lib/seoConfig';
import { Course, Article } from '../types';

interface SEOHeadProps {
  currentTab: string;
  inspectCourse?: Course | null;
  readingArticle?: Article | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  currentTab,
  inspectCourse,
  readingArticle
}) => {
  useEffect(() => {
    // Ensure regular pages are indexed
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (robotsTag) {
      robotsTag.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    }

    let title = '';
    let description = '';
    let canonical = '';
    let ogType = 'website';
    let ogImage = `${ACADEMY_BASE_URL}/logo.png`;
    let breadcrumbItems: { name: string; item: string }[] = [];
    let extraSchema: any = null;

    if (inspectCourse) {
      title = `${inspectCourse.name} Online Course with Tajweed | Al-Noor Quran Academy`;
      description = inspectCourse.shortDescription || `Learn ${inspectCourse.name} with 1-on-1 certified male and female tutors. Flexible timings and 3-day free trial.`;
      canonical = `${ACADEMY_BASE_URL}/courses/${inspectCourse.slug || inspectCourse.id}`;
      ogType = 'article';
      breadcrumbItems = [
        { name: 'Home', item: `${ACADEMY_BASE_URL}/` },
        { name: 'Courses', item: `${ACADEMY_BASE_URL}/online-quran-classes` },
        { name: inspectCourse.name, item: canonical }
      ];

      extraSchema = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: inspectCourse.name,
        description: inspectCourse.description || inspectCourse.shortDescription,
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Al-Noor Quran Academy',
          sameAs: ACADEMY_BASE_URL
        },
        timeRequired: inspectCourse.duration || '3-6 Months',
        offers: {
          '@type': 'Offer',
          category: 'Monthly Quran Tuition',
          priceCurrency: 'USD',
          price: inspectCourse.feeUSD || 35,
          availability: 'https://schema.org/InStock',
          url: canonical
        }
      };
    } else if (readingArticle) {
      title = `${readingArticle.title} | Al-Noor Quran Academy Blog`;
      description = readingArticle.summary || `Read complete educational guide: ${readingArticle.title}. Practical advice for Muslim learners and parents.`;
      canonical = `${ACADEMY_BASE_URL}/blog/${readingArticle.slug || readingArticle.id}`;
      ogType = 'article';
      breadcrumbItems = [
        { name: 'Home', item: `${ACADEMY_BASE_URL}/` },
        { name: 'Blog', item: `${ACADEMY_BASE_URL}/blog` },
        { name: readingArticle.title, item: canonical }
      ];

      extraSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: readingArticle.title,
        description: readingArticle.summary,
        author: {
          '@type': readingArticle.author ? 'Person' : 'EducationalOrganization',
          name: readingArticle.author || 'Al-Noor Quran Academy Editorial Team'
        },
        publisher: {
          '@type': 'EducationalOrganization',
          name: 'Al-Noor Quran Academy',
          logo: {
            '@type': 'ImageObject',
            url: `${ACADEMY_BASE_URL}/logo.png`
          }
        },
        datePublished: readingArticle.publishedAt || '2026-01-15',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonical
        }
      };
    } else {
      const meta = SEO_PAGE_MAP[currentTab] || SEO_PAGE_MAP.home;
      title = meta.title;
      description = meta.description;
      canonical = meta.canonical;
      ogType = meta.ogType || 'website';
      breadcrumbItems = meta.breadcrumbs;
    }

    // 1. Update document title
    document.title = title;

    // 2. Update meta description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', description);

    // 3. Update canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonical);

    // 4. Update OpenGraph & Twitter tags
    const updateOrCreateMeta = (attribute: 'property' | 'name', key: string, content: string) => {
      let tag = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOrCreateMeta('property', 'og:title', title);
    updateOrCreateMeta('property', 'og:description', description);
    updateOrCreateMeta('property', 'og:url', canonical);
    updateOrCreateMeta('property', 'og:type', ogType);
    updateOrCreateMeta('property', 'og:image', ogImage);
    updateOrCreateMeta('property', 'og:site_name', 'Al-Noor Quran Academy');
    updateOrCreateMeta('property', 'og:locale', 'en_US');

    updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMeta('name', 'twitter:title', title);
    updateOrCreateMeta('name', 'twitter:description', description);
    updateOrCreateMeta('name', 'twitter:image', ogImage);

    // 5. Inject bidirectional hreflang links
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    HREFLANG_ALTERNATES.forEach(({ hreflang, href }) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', href);
      document.head.appendChild(link);
    });

    // 6. Inject Breadcrumb Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: item.item
      }))
    };

    const oldBreadcrumbScript = document.getElementById('dynamic-breadcrumb-schema');
    if (oldBreadcrumbScript) oldBreadcrumbScript.remove();

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = 'dynamic-breadcrumb-schema';
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    // 7. Inject item schema if available (Course/Article)
    const oldItemScript = document.getElementById('dynamic-item-schema');
    if (oldItemScript) oldItemScript.remove();

    if (extraSchema) {
      const itemScript = document.createElement('script');
      itemScript.id = 'dynamic-item-schema';
      itemScript.type = 'application/ld+json';
      itemScript.textContent = JSON.stringify(extraSchema);
      document.head.appendChild(itemScript);
    }
  }, [currentTab, inspectCourse, readingArticle]);

  return null;
};
