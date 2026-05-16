import { useEffect } from 'react';

const SITE_URL = 'https://betterwashindia.com';
const SITE_NAME = 'BetterWash India';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&q=80';

/**
 * SEOHead - Dynamically sets meta tags, OG tags, and JSON-LD schema
 *
 * Usage:
 *   <SEOHead
 *     title="Product Name | BetterWash"
 *     description="Product description..."
 *     keywords="keyword1, keyword2"
 *     canonicalUrl="/product/slug"
 *     ogType="product"
 *     ogImage="https://..."
 *     jsonLd={{ "@context": "https://schema.org", ... }}
 *   />
 */
function SEOHead({ title, description, keywords, canonicalUrl, ogType = 'website', ogImage, jsonLd }) {
  useEffect(() => {
    // Set document title
    if (title) {
      document.title = title;
    }

    const setMeta = (property, content, isOg = false) => {
      if (!content) return;
      const attr = isOg ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, property);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    // Standard meta tags
    setMeta('description', description);
    setMeta('keywords', keywords);

    // Open Graph tags
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', ogType, true);
    setMeta('og:image', ogImage || DEFAULT_IMAGE, true);
    setMeta('og:site_name', SITE_NAME, true);
    if (canonicalUrl) {
      const fullUrl = canonicalUrl.startsWith('http') ? canonicalUrl : `${SITE_URL}${canonicalUrl}`;
      setMeta('og:url', fullUrl, true);
    }

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage || DEFAULT_IMAGE);

    // Canonical URL
    if (canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonicalUrl.startsWith('http') ? canonicalUrl : `${SITE_URL}${canonicalUrl}`;
    }

    // JSON-LD structured data
    let scriptEl = document.querySelector('script[data-seo-jsonld]');
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.type = 'application/ld+json';
        scriptEl.setAttribute('data-seo-jsonld', 'true');
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    }

    // Cleanup on unmount - restore defaults
    return () => {
      document.title = `${SITE_NAME} - Premium Natural Skincare & Personal Care Products`;
      if (scriptEl) scriptEl.remove();
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.remove();
    };
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, jsonLd]);

  return null; // This component renders nothing visible
}

/**
 * Generate JSON-LD Product schema
 */
export function getProductJsonLd(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.longDescription || product.description,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": "BetterWash"
    },
    "offers": {
      "@type": "Offer",
      "url": `${SITE_URL}/product/${product.slug}`,
      "priceCurrency": "INR",
      "price": product.numericPrice,
      "availability": product.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "BetterWash India"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviews
    }
  };
}

/**
 * Generate JSON-LD BlogPosting schema
 */
export function getBlogJsonLd(blog) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt,
    "image": blog.image,
    "datePublished": blog.date,
    "author": {
      "@type": "Organization",
      "name": "BetterWash India"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BetterWash India",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/favicon.svg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${blog.slug}`
    }
  };
}

/**
 * Generate JSON-LD BreadcrumbList schema
 */
export function getBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url ? `${SITE_URL}${item.url}` : undefined
    }))
  };
}

export default SEOHead;
