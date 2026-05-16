import { Router } from 'express';
import { readJSON, writeJSON } from '../utils/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// GET /api/products - public
router.get('/', (req, res) => {
  const products = readJSON('products.json');
  res.json(products);
});

// GET /api/products/:id - public
router.get('/:id', (req, res) => {
  const products = readJSON('products.json');
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST /api/products - admin only
router.post('/', authenticateToken, (req, res) => {
  const products = readJSON('products.json');
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

  const newProduct = {
    id: newId,
    name: req.body.name,
    category: req.body.category,
    price: `₹${req.body.numericPrice}`,
    originalPrice: `₹${req.body.originalNumericPrice || req.body.numericPrice}`,
    numericPrice: Number(req.body.numericPrice),
    description: req.body.description || '',
    longDescription: req.body.longDescription || '',
    benefits: req.body.benefits || [],
    features: req.body.features || [],
    image: req.body.image || '',
    color: req.body.color || '#008b8b',
    stock: Number(req.body.stock) || 0,
    rating: Number(req.body.rating) || 4.0,
    reviews: Number(req.body.reviews) || 0
  };

  products.push(newProduct);
  writeJSON('products.json', products);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - admin only
router.put('/:id', authenticateToken, (req, res) => {
  const products = readJSON('products.json');
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  const updated = {
    ...products[index],
    ...req.body,
    id: products[index].id,
    price: `₹${req.body.numericPrice || products[index].numericPrice}`,
    originalPrice: `₹${req.body.originalNumericPrice || parseInt(products[index].originalPrice.replace('₹', ''))}`,
    numericPrice: Number(req.body.numericPrice || products[index].numericPrice),
  };

  products[index] = updated;
  writeJSON('products.json', products);
  res.json(updated);
});

// DELETE /api/products/:id - admin only
router.delete('/:id', authenticateToken, (req, res) => {
  let products = readJSON('products.json');
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  products.splice(index, 1);
  writeJSON('products.json', products);
  res.json({ message: 'Product deleted' });
});

export default router;
