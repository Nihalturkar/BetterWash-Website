import { Router } from 'express';
import { readJSON } from '../utils/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// GET /api/dashboard/stats - admin only
router.get('/stats', authenticateToken, (req, res) => {
  const products = readJSON('products.json');
  const categories = readJSON('categories.json');
  const orders = readJSON('orders.json');
  const blogs = readJSON('blogs.json');
  const contacts = readJSON('contacts.json');

  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'delivered').length;

  const recentOrders = orders
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const lowStockProducts = products.filter(p => p.stock < 20);

  res.json({
    totalProducts: products.length,
    totalCategories: categories.length,
    totalOrders: orders.length,
    totalBlogs: blogs.length,
    totalContacts: contacts.length,
    unreadContacts: contacts.filter(c => c.status === 'unread').length,
    totalRevenue,
    pendingOrders,
    completedOrders,
    recentOrders,
    lowStockProducts,
    recentContacts: contacts
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
  });
});

export default router;
