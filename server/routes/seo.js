import { Router } from 'express';
import { readJSON } from '../utils/db.js';

const router = Router();

const SITE_URL = 'https://betterwashindia.com';

// GET /sitemap.xml - Dynamic sitemap generation
router.get('/sitemap.xml', (req, res) => {
  const products = readJSON('products.json');
  const blogs = readJSON('blogs.json');
  const categories = readJSON('categories.json');

  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/cart</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
`;

  // Category pages
  for (const cat of categories) {
    const slug = cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-');
    xml += `  <url>
    <loc>${SITE_URL}/category/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }

  // Product pages
  for (const product of products) {
    const slug = product.slug || product.id;
    xml += `  <url>
    <loc>${SITE_URL}/product/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
  }

  // Blog pages
  for (const blog of blogs) {
    const slug = blog.slug || blog.id;
    xml += `  <url>
    <loc>${SITE_URL}/blog/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  }

  xml += `</urlset>`;

  res.set('Content-Type', 'application/xml');
  res.send(xml);
});

// GET /robots.txt
router.get('/robots.txt', (req, res) => {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*
Disallow: /api/*
Disallow: /cart

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# Crawl-delay (be polite to our server)
Crawl-delay: 1
`;

  res.set('Content-Type', 'text/plain');
  res.send(robotsTxt);
});

export default router;
