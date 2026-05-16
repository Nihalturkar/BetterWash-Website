import { useState, useRef } from 'react';

import { BASE_URL } from '../../config';

function ImageUpload({ value, onChange, label = 'Image', token }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${BASE_URL}/api/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        onChange(`${BASE_URL}${data.url}`);
      }
    } catch {
      alert('Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="admin-form-group">
      <label>{label}</label>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <label className="admin-btn admin-btn-sm admin-btn-secondary" style={{ cursor: 'pointer', marginBottom: 0 }}>
          {uploading ? 'Uploading...' : 'Upload Image'}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </label>
        <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>or paste URL below</span>
      </div>
      <input
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder="https://example.com/image.jpg"
        style={{ marginTop: '0.4rem' }}
      />
      {value && (
        <div style={{ marginTop: '0.5rem', position: 'relative', display: 'inline-block' }}>
          <img src={value} alt="Preview" style={{ maxHeight: '100px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #e5e7eb' }} />
          <button
            type="button"
            onClick={() => onChange('')}
            style={{ position: 'absolute', top: '-6px', right: '-6px', width: '22px', height: '22px', borderRadius: '50%', background: '#ef4444', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >✕</button>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
