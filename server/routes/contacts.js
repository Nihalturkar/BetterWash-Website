import { Router } from 'express';
import { readJSON, writeJSON } from '../utils/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// GET /api/contacts - admin only
router.get('/', authenticateToken, (req, res) => {
  const contacts = readJSON('contacts.json');
  res.json(contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

// POST /api/contacts - public (user submits contact form)
router.post('/', (req, res) => {
  const contacts = readJSON('contacts.json');
  const newId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;

  const newContact = {
    id: newId,
    name: req.body.name,
    email: req.body.email || '',
    phone: req.body.phone || '',
    subject: req.body.subject || '',
    message: req.body.message,
    status: 'unread',
    createdAt: new Date().toISOString()
  };

  contacts.push(newContact);
  writeJSON('contacts.json', contacts);
  res.status(201).json({ message: 'Message sent successfully!' });
});

// PUT /api/contacts/:id/status - admin only
router.put('/:id/status', authenticateToken, (req, res) => {
  const contacts = readJSON('contacts.json');
  const index = contacts.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Contact not found' });

  contacts[index].status = req.body.status;
  writeJSON('contacts.json', contacts);
  res.json(contacts[index]);
});

// DELETE /api/contacts/:id - admin only
router.delete('/:id', authenticateToken, (req, res) => {
  let contacts = readJSON('contacts.json');
  const index = contacts.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Contact not found' });

  contacts.splice(index, 1);
  writeJSON('contacts.json', contacts);
  res.json({ message: 'Contact deleted' });
});

export default router;
