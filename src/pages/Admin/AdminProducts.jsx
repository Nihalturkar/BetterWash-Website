import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ImageUpload from '../../components/Admin/ImageUpload';

import { API_URL } from '../../config';

const emptyProduct = {
  name: '', category: '', numericPrice: '', originalNumericPrice: '',
  description: '', longDescription: '', benefits: '', features: '',
  image: '', color: '#008b8b', stock: '', rating: '4.0', reviews: '0'
};

function AdminProducts() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);

  const fetchProducts = () => {
    Promise.all([
      fetch(`${API_URL}/products`).then(r => r.json()),
      fetch(`${API_URL}/categories`).then(r => r.json())
    ]).then(([prods, cats]) => {
      setProducts(prods);
      setCategories(cats);
      setLoading(false);
    });
  };

  useEffect(() => { fetchProducts(); }, []);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyProduct);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      numericPrice: product.numericPrice,
      originalNumericPrice: parseInt(product.originalPrice.replace('₹', '')),
      description: product.description,
      longDescription: product.longDescription || '',
      benefits: (product.benefits || []).join(', '),
      features: (product.features || []).join(', '),
      image: product.image,
      color: product.color || '#008b8b',
      stock: product.stock,
      rating: product.rating,
      reviews: product.reviews
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const body = {
      ...form,
      numericPrice: Number(form.numericPrice),
      originalNumericPrice: Number(form.originalNumericPrice || form.numericPrice),
      stock: Number(form.stock),
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      benefits: form.benefits.split(',').map(b => b.trim()).filter(Boolean),
      features: form.features.split(',').map(f => f.trim()).filter(Boolean),
    };

    const url = editId ? `${API_URL}/products/${editId}` : `${API_URL}/products`;
    const method = editId ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      alert('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProducts();
  };

  if (loading) return <div className="admin-loading">Loading products...</div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Products ({products.length})</h1>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>+ Add Product</button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td><img src={p.image} alt={p.name} className="admin-product-thumb" /></td>
                  <td className="admin-td-name">{p.name}</td>
                  <td><span className="admin-badge admin-badge-info">{p.category}</span></td>
                  <td>₹{p.numericPrice}</td>
                  <td>
                    <span className={`admin-badge ${p.stock < 20 ? 'admin-badge-pending' : 'admin-badge-delivered'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td>{p.rating}</td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-btn admin-btn-sm admin-btn-edit" onClick={() => openEdit(p)}>Edit</button>
                      <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editId ? 'Edit Product' : 'Add Product'}</h2>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-modal-body">
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Product Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="admin-form-group">
                  <label>Category</label>
                  <select name="category" value={form.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Price (₹)</label>
                  <input name="numericPrice" type="number" value={form.numericPrice} onChange={handleChange} required />
                </div>
                <div className="admin-form-group">
                  <label>Original Price (₹)</label>
                  <input name="originalNumericPrice" type="number" value={form.originalNumericPrice} onChange={handleChange} />
                </div>
                <div className="admin-form-group">
                  <label>Stock</label>
                  <input name="stock" type="number" value={form.stock} onChange={handleChange} required />
                </div>
                <div className="admin-form-group">
                  <label>Rating</label>
                  <input name="rating" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={handleChange} />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Short Description</label>
                <input name="description" value={form.description} onChange={handleChange} />
              </div>
              <div className="admin-form-group">
                <label>Long Description</label>
                <textarea name="longDescription" value={form.longDescription} onChange={handleChange} rows="3" />
              </div>
              <div className="admin-form-group">
                <label>Benefits (comma separated)</label>
                <input name="benefits" value={form.benefits} onChange={handleChange} placeholder="Benefit 1, Benefit 2" />
              </div>
              <div className="admin-form-group">
                <label>Features (comma separated)</label>
                <input name="features" value={form.features} onChange={handleChange} placeholder="Feature 1, Feature 2" />
              </div>
              <ImageUpload label="Product Image" value={form.image} onChange={v => setForm(prev => ({...prev, image: v}))} token={token} />
              <div className="admin-form-group">
                <label>Color</label>
                <input name="color" type="color" value={form.color} onChange={handleChange} />
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : (editId ? 'Update' : 'Add Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
