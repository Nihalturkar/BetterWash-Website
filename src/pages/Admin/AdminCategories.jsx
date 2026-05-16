import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ImageUpload from '../../components/Admin/ImageUpload';

import { API_URL } from '../../config';

function generateSlug(text) {
  return text.toString().toLowerCase().trim()
    .replace(/[\s_]+/g, '-').replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

function AdminCategories() {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '', image: '', count: '', color: '#008b8b' });
  const [saving, setSaving] = useState(false);

  const fetchCategories = () => {
    fetch(`${API_URL}/categories`)
      .then(r => r.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      });
  };

  useEffect(() => { fetchCategories(); }, []);

  const openAdd = () => {
    setEditId(null);
    setForm({ name: '', slug: '', description: '', image: '', count: '', color: '#008b8b' });
    setShowModal(true);
  };

  const openEdit = (cat) => {
    setEditId(cat.id);
    setForm({ name: cat.name, slug: cat.slug || '', description: cat.description, image: cat.image, count: cat.count, color: cat.color });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'name' && (!prev.slug || prev.slug === generateSlug(prev.name))) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const body = {
      ...form,
      slug: form.slug || generateSlug(form.name),
    };

    const url = editId ? `${API_URL}/categories/${editId}` : `${API_URL}/categories`;
    const method = editId ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      setShowModal(false);
      fetchCategories();
    } catch (err) {
      alert('Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchCategories();
  };

  if (loading) return <div className="admin-loading">Loading categories...</div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Categories ({categories.length})</h1>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>+ Add Category</button>
      </div>

      <div className="admin-categories-grid">
        {categories.map(cat => (
          <div className="admin-category-card" key={cat.id}>
            <div className="admin-category-img-box">
              <img src={cat.image} alt={cat.name} />
              <div className="admin-category-color-dot" style={{ background: cat.color }}></div>
            </div>
            <div className="admin-category-info">
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
              <code style={{ fontSize: '0.7rem', color: '#6b7280', background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>/{cat.slug || '—'}</code>
              <span className="admin-badge admin-badge-info" style={{ marginLeft: '6px' }}>{cat.count}</span>
            </div>
            <div className="admin-category-actions">
              <button className="admin-btn admin-btn-sm admin-btn-edit" onClick={() => openEdit(cat)}>Edit</button>
              <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => handleDelete(cat.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal admin-modal-sm" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editId ? 'Edit Category' : 'Add Category'}</h2>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-modal-body">
              <div className="admin-form-group">
                <label>Category Name</label>
                <input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="admin-form-group">
                <label>URL Slug <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 400 }}>(SEO URL - auto generated)</span></label>
                <input name="slug" value={form.slug} onChange={handleChange} placeholder="auto-generated-from-name" style={{ fontFamily: 'monospace', fontSize: '0.85rem' }} />
                {form.slug && <span style={{ fontSize: '0.7rem', color: '#6b7280' }}>URL: /category/{form.slug}</span>}
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <input name="description" value={form.description} onChange={handleChange} />
              </div>
              <div className="admin-form-group">
                <label>Product Count Label</label>
                <input name="count" value={form.count} onChange={handleChange} placeholder="12 Products" />
              </div>
              <ImageUpload label="Category Image" value={form.image} onChange={v => setForm(prev => ({...prev, image: v}))} token={token} />
              <div className="admin-form-group">
                <label>Color</label>
                <input name="color" type="color" value={form.color} onChange={handleChange} />
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : (editId ? 'Update' : 'Add Category')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCategories;
