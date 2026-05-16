import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ImageUpload from '../../components/Admin/ImageUpload';

import { API_URL } from '../../config';

function generateSlug(text) {
  return text.toString().toLowerCase().trim()
    .replace(/[\s_]+/g, '-').replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

const emptyBlog = {
  title: '', slug: '', excerpt: '', category: '', image: '', link: '', readTime: '3 min read', content: '', productAds: [],
  seo: { metaTitle: '', metaDescription: '', metaKeywords: '', canonicalUrl: '', imageAlt: '' }
};

function AdminBlogs() {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyBlog);
  const [saving, setSaving] = useState(false);

  const fetchBlogs = () => {
    fetch(`${API_URL}/blogs`)
      .then(r => r.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      });
  };

  useEffect(() => { fetchBlogs(); }, []);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyBlog);
    setShowModal(true);
  };

  const openEdit = (blog) => {
    setEditId(blog.id);
    setForm({
      title: blog.title,
      slug: blog.slug || '',
      excerpt: blog.excerpt,
      category: blog.category,
      image: blog.image || '',
      link: blog.link || '',
      readTime: blog.readTime,
      content: (blog.content || []).join('\n\n'),
      productAds: blog.productAds || [],
      seo: blog.seo || { metaTitle: '', metaDescription: '', metaKeywords: '', canonicalUrl: '', imageAlt: '' }
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'title' && (!prev.slug || prev.slug === generateSlug(prev.title))) {
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
      slug: form.slug || generateSlug(form.title),
      content: form.content.split('\n\n').filter(Boolean),
    };

    const url = editId ? `${API_URL}/blogs/${editId}` : `${API_URL}/blogs`;
    const method = editId ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      setShowModal(false);
      fetchBlogs();
    } catch (err) {
      alert('Failed to save blog');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    await fetch(`${API_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchBlogs();
  };

  // Product Ads helpers
  const addAd = () => {
    setForm(prev => ({ ...prev, productAds: [...prev.productAds, { image: '', label: '', productId: '' }] }));
  };

  const updateAd = (index, field, value) => {
    setForm(prev => {
      const ads = [...prev.productAds];
      ads[index] = { ...ads[index], [field]: value };
      return { ...prev, productAds: ads };
    });
  };

  const removeAd = (index) => {
    setForm(prev => ({ ...prev, productAds: prev.productAds.filter((_, i) => i !== index) }));
  };

  if (loading) return <div className="admin-loading">Loading blogs...</div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Blog Posts ({blogs.length})</h1>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>+ Add Blog Post</button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog.id}>
                  <td>
                    {blog.image ? (
                      <img src={blog.image} alt={blog.title} className="admin-product-thumb" />
                    ) : (
                      <span style={{ color: '#9ca3af' }}>No image</span>
                    )}
                  </td>
                  <td className="admin-td-name">{blog.title}</td>
                  <td><code style={{ fontSize: '0.75rem', color: '#6b7280', background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>{blog.slug || '—'}</code></td>
                  <td><span className="admin-badge admin-badge-info">{blog.category}</span></td>
                  <td>{blog.date}</td>
                  <td>
                    <div className="admin-actions">
                      <button className="admin-btn admin-btn-sm admin-btn-edit" onClick={() => openEdit(blog)}>Edit</button>
                      <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => handleDelete(blog.id)}>Delete</button>
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
              <h2>{editId ? 'Edit Blog Post' : 'Add Blog Post'}</h2>
              <button className="admin-modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-modal-body">
              <div className="admin-form-group">
                <label>Title</label>
                <input name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div className="admin-form-group">
                <label>URL Slug <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 400 }}>(SEO URL - auto generated)</span></label>
                <input name="slug" value={form.slug} onChange={handleChange} placeholder="auto-generated-from-title" style={{ fontFamily: 'monospace', fontSize: '0.85rem' }} />
                {form.slug && <span style={{ fontSize: '0.7rem', color: '#6b7280' }}>URL: /blog/{form.slug}</span>}
              </div>
              <div className="admin-form-group">
                <label>Excerpt (Short Description)</label>
                <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows="2" required />
              </div>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Category</label>
                  <input name="category" value={form.category} onChange={handleChange} placeholder="Skin Care, Hair Care, Wellness" required />
                </div>
                <div className="admin-form-group">
                  <label>Read Time</label>
                  <input name="readTime" value={form.readTime} onChange={handleChange} placeholder="5 min read" />
                </div>
              </div>
              <ImageUpload label="Blog Image" value={form.image} onChange={v => setForm(prev => ({...prev, image: v}))} token={token} />
              <div className="admin-form-group">
                <label>Link URL (any external link)</label>
                <input name="link" value={form.link} onChange={handleChange} placeholder="https://example.com/article" />
              </div>
              <div className="admin-form-group">
                <label>Content (separate paragraphs with empty lines, use **bold** for headings)</label>
                <textarea name="content" value={form.content} onChange={handleChange} rows="10" required
                  style={{ fontFamily: 'monospace', fontSize: '0.85rem' }} />
              </div>

              {/* SEO Section */}
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
                <label style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a', marginBottom: '0.75rem', display: 'block' }}>SEO Settings (Optional)</label>
                <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '0.75rem' }}>Google search me dikhne ke liye. Better SEO = More traffic from Google.</p>
                <div className="admin-form-group">
                  <label>Meta Title <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 400 }}>(60 chars recommended)</span></label>
                  <input value={form.seo.metaTitle} onChange={e => setForm(prev => ({...prev, seo: {...prev.seo, metaTitle: e.target.value}}))} placeholder="SEO optimized title for Google" />
                  <span style={{ fontSize: '0.7rem', color: form.seo.metaTitle.length > 60 ? '#ef4444' : '#9ca3af' }}>{form.seo.metaTitle.length}/60</span>
                </div>
                <div className="admin-form-group">
                  <label>Meta Description <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 400 }}>(155 chars recommended)</span></label>
                  <textarea value={form.seo.metaDescription} onChange={e => setForm(prev => ({...prev, seo: {...prev.seo, metaDescription: e.target.value}}))} rows="2" placeholder="155 characters description for Google search results" />
                  <span style={{ fontSize: '0.7rem', color: form.seo.metaDescription.length > 155 ? '#ef4444' : '#9ca3af' }}>{form.seo.metaDescription.length}/155</span>
                </div>
                <div className="admin-form-group">
                  <label>Meta Keywords (comma separated)</label>
                  <input value={form.seo.metaKeywords} onChange={e => setForm(prev => ({...prev, seo: {...prev.seo, metaKeywords: e.target.value}}))} placeholder="skincare, natural products, herbal shampoo" />
                </div>
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label>Canonical URL</label>
                    <input value={form.seo.canonicalUrl} onChange={e => setForm(prev => ({...prev, seo: {...prev.seo, canonicalUrl: e.target.value}}))} placeholder="https://betterwash.com/blog/..." />
                  </div>
                  <div className="admin-form-group">
                    <label>Image Alt Tag</label>
                    <input value={form.seo.imageAlt} onChange={e => setForm(prev => ({...prev, seo: {...prev.seo, imageAlt: e.target.value}}))} placeholder="Natural skincare ingredients" />
                  </div>
                </div>
              </div>

              {/* Product Ads Section */}
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <label style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a' }}>Product Suggestions (Optional)</label>
                  <button type="button" className="admin-btn admin-btn-sm admin-btn-secondary" onClick={addAd}>+ Add Product</button>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '0.75rem' }}>
                  Blog open hone pe right side me ye products dikhenge. Koi bhi product add karo ya khali chod do.
                </p>

                {form.productAds.map((ad, i) => (
                  <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: '10px', padding: '0.75rem', marginBottom: '0.75rem', background: '#fafafa' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ fontSize: '0.8rem' }}>Product {i + 1}</strong>
                      <button type="button" className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => removeAd(i)}>Remove</button>
                    </div>
                    <ImageUpload label="Product Image" value={ad.image} onChange={v => updateAd(i, 'image', v)} token={token} />
                    <div className="admin-form-grid">
                      <div className="admin-form-group">
                        <label>Product Name</label>
                        <input value={ad.label} onChange={e => updateAd(i, 'label', e.target.value)} placeholder="Herbal Shampoo" />
                      </div>
                      <div className="admin-form-group">
                        <label>Product ID</label>
                        <input type="number" value={ad.productId} onChange={e => updateAd(i, 'productId', Number(e.target.value))} placeholder="1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : (editId ? 'Update' : 'Publish')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBlogs;
