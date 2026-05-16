import { Router } from 'express';
import { readJSON, writeJSON } from '../utils/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// GET /api/categories - public
router.get('/', (req, res) => {
  const categories = readJSON('categories.json');
  res.json(categories);
});

// POST /api/categories - admin only
router.post('/', authenticateToken, (req, res) => {
  const categories = readJSON('categories.json');
  const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;

  const newCategory = {
    id: newId,
    name: req.body.name,
    image: req.body.image || '',
    count: req.body.count || '0 Products',
    description: req.body.description || '',
    color: req.body.color || '#008b8b'
  };

  categories.push(newCategory);
  writeJSON('categories.json', categories);
  res.status(201).json(newCategory);
});

// PUT /api/categories/:id - admin only
router.put('/:id', authenticateToken, (req, res) => {
  const categories = readJSON('categories.json');
  const index = categories.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Category not found' });

  categories[index] = { ...categories[index], ...req.body, id: categories[index].id };
  writeJSON('categories.json', categories);
  res.json(categories[index]);
});

// DELETE /api/categories/:id - admin only
router.delete('/:id', authenticateToken, (req, res) => {
  let categories = readJSON('categories.json');
  const index = categories.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Category not found' });

  categories.splice(index, 1);
  writeJSON('categories.json', categories);
  res.json({ message: 'Category deleted' });
});

export default router;
