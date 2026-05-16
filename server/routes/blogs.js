import { Router } from 'express';
import { readJSON, writeJSON } from '../utils/db.js';
import { generateSlug, ensureUniqueSlug } from '../utils/slug.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// GET /api/blogs - public
router.get('/', (req, res) => {
  const blogs = readJSON('blogs.json');
  res.json(blogs);
});

// GET /api/blogs/:idOrSlug - public (supports both ID and slug)
router.get('/:idOrSlug', (req, res) => {
  const blogs = readJSON('blogs.json');
  const param = req.params.idOrSlug;
  const blog = blogs.find(b =>
    b.slug === param || b.id === parseInt(param)
  );
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json(blog);
});

// POST /api/blogs - admin only
router.post('/', authenticateToken, (req, res) => {
  const blogs = readJSON('blogs.json');
  const newId = blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1;

  const slug = ensureUniqueSlug(
    req.body.slug || generateSlug(req.body.title),
    blogs
  );

  const newBlog = {
    id: newId,
    slug,
    title: req.body.title,
    excerpt: req.body.excerpt || '',
    date: req.body.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: req.body.readTime || '3 min read',
    category: req.body.category || 'General',
    image: req.body.image || '',
    link: req.body.link || '',
    productAds: req.body.productAds || [],
    seo: req.body.seo || { metaTitle: '', metaDescription: '', metaKeywords: '', canonicalUrl: '', imageAlt: '' },
    content: req.body.content || []
  };

  blogs.push(newBlog);
  writeJSON('blogs.json', blogs);
  res.status(201).json(newBlog);
});

// PUT /api/blogs/:id - admin only
router.put('/:id', authenticateToken, (req, res) => {
  const blogs = readJSON('blogs.json');
  const index = blogs.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Blog not found' });

  const slug = req.body.slug
    ? ensureUniqueSlug(req.body.slug, blogs, blogs[index].id)
    : blogs[index].slug || generateSlug(req.body.title || blogs[index].title);

  blogs[index] = { ...blogs[index], ...req.body, id: blogs[index].id, slug };
  writeJSON('blogs.json', blogs);
  res.json(blogs[index]);
});

// DELETE /api/blogs/:id - admin only
router.delete('/:id', authenticateToken, (req, res) => {
  let blogs = readJSON('blogs.json');
  const index = blogs.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Blog not found' });

  blogs.splice(index, 1);
  writeJSON('blogs.json', blogs);
  res.json({ message: 'Blog deleted' });
});

export default router;
