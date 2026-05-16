import { Router } from 'express';
import { readJSON, writeJSON } from '../utils/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// GET /api/settings - public (frontend needs this)
router.get('/', (req, res) => {
  const settings = readJSON('settings.json');
  res.json(settings);
});

// PUT /api/settings - admin only (update entire settings)
router.put('/', authenticateToken, (req, res) => {
  const settings = readJSON('settings.json');
  const updated = { ...settings, ...req.body };
  writeJSON('settings.json', updated);
  res.json(updated);
});

// --- Offers ---
router.put('/offers', authenticateToken, (req, res) => {
  const settings = readJSON('settings.json');
  settings.offers = req.body.offers;
  writeJSON('settings.json', settings);
  res.json({ offers: settings.offers });
});

// --- Logo & Site Name ---
router.put('/branding', authenticateToken, (req, res) => {
  const settings = readJSON('settings.json');
  if (req.body.logo !== undefined) settings.logo = req.body.logo;
  if (req.body.siteName !== undefined) settings.siteName = req.body.siteName;
  writeJSON('settings.json', settings);
  res.json({ logo: settings.logo, siteName: settings.siteName });
});

// --- Hero Banners ---
router.put('/banners', authenticateToken, (req, res) => {
  const settings = readJSON('settings.json');
  settings.heroBanners = req.body.heroBanners;
  writeJSON('settings.json', settings);
  res.json({ heroBanners: settings.heroBanners });
});

// --- About Us ---
router.put('/about', authenticateToken, (req, res) => {
  const settings = readJSON('settings.json');
  settings.aboutUs = req.body.aboutUs;
  writeJSON('settings.json', settings);
  res.json({ aboutUs: settings.aboutUs });
});

// --- Reviews ---
router.put('/reviews', authenticateToken, (req, res) => {
  const settings = readJSON('settings.json');
  settings.reviews = req.body.reviews;
  writeJSON('settings.json', settings);
  res.json({ reviews: settings.reviews });
});

// --- Social Links ---
router.put('/social', authenticateToken, (req, res) => {
  const settings = readJSON('settings.json');
  settings.socialLinks = req.body.socialLinks;
  if (req.body.whatsappNumber !== undefined) settings.whatsappNumber = req.body.whatsappNumber;
  writeJSON('settings.json', settings);
  res.json({ socialLinks: settings.socialLinks, whatsappNumber: settings.whatsappNumber });
});

// --- Video Ads ---
router.put('/videoAds', authenticateToken, (req, res) => {
  const settings = readJSON('settings.json');
  settings.videoAds = req.body.videoAds;
  writeJSON('settings.json', settings);
  res.json({ videoAds: settings.videoAds });
});

// --- Blog Ads ---
router.put('/blogAds', authenticateToken, (req, res) => {
  const settings = readJSON('settings.json');
  settings.blogAds = req.body.blogAds;
  writeJSON('settings.json', settings);
  res.json({ blogAds: settings.blogAds });
});

// --- Legal Pages (Privacy Policy & Terms) ---
router.put('/legal', authenticateToken, (req, res) => {
  const settings = readJSON('settings.json');
  if (req.body.privacyPolicy !== undefined) settings.privacyPolicy = req.body.privacyPolicy;
  if (req.body.termsOfService !== undefined) settings.termsOfService = req.body.termsOfService;
  writeJSON('settings.json', settings);
  res.json({ privacyPolicy: settings.privacyPolicy, termsOfService: settings.termsOfService });
});

export default router;
