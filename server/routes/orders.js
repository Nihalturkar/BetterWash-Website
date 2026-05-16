import { Router } from 'express';
import { readJSON, writeJSON } from '../utils/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// GET /api/orders - admin only
router.get('/', authenticateToken, (req, res) => {
  const orders = readJSON('orders.json');
  res.json(orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// POST /api/orders - public (customer places order)
router.post('/', (req, res) => {
  const orders = readJSON('orders.json');
  const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;

  const newOrder = {
    id: newId,
    customer: {
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      pincode: req.body.pincode
    },
    items: req.body.items || [],
    total: req.body.total || 0,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);
  writeJSON('orders.json', orders);
  res.status(201).json(newOrder);
});

// PUT /api/orders/:id/status - admin only
router.put('/:id/status', authenticateToken, (req, res) => {
  const orders = readJSON('orders.json');
  const index = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Order not found' });

  orders[index].status = req.body.status;
  writeJSON('orders.json', orders);
  res.json(orders[index]);
});

// DELETE /api/orders/:id - admin only
router.delete('/:id', authenticateToken, (req, res) => {
  let orders = readJSON('orders.json');
  const index = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Order not found' });

  orders.splice(index, 1);
  writeJSON('orders.json', orders);
  res.json({ message: 'Order deleted' });
});

export default router;
