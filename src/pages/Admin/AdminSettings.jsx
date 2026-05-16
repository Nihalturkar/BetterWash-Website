import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import ImageUpload from '../../components/Admin/ImageUpload';

import { API_URL } from '../../config';

function AdminSettings() {
  const { token } = useAuth();
  const { refreshSettings } = useSettings();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('branding');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/settings`)
      .then(r => r.json())
      .then(data => { setSettings(data); setLoading(false); });
  }, []);

  const saveSection = async (endpoint, body) => {
    setSaving(true);
    setSaveMsg('');
    try {
      await fetch(`${API_URL}/settings/${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      setSaveMsg('Saved successfully!');
      refreshSettings();
      setTimeout(() => setSaveMsg(''), 2000);
    } catch {
      setSaveMsg('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) return <div className="admin-loading">Loading settings...</div>;

  const tabs = [
    { id: 'branding', label: 'Logo & Branding', icon: '🎨' },
    { id: 'offers', label: 'Offer Bar', icon: '🎉' },
    { id: 'banners', label: 'Hero Banners', icon: '🖼️' },
    { id: 'about', label: 'About Us', icon: '📖' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'social', label: 'Social & WhatsApp', icon: '🔗' },
    { id: 'videoAds', label: 'Video Ads', icon: '🎬' },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Site Settings</h1>
        {saveMsg && <span className={`admin-badge ${saveMsg.includes('success') ? 'admin-badge-delivered' : 'admin-badge-pending'}`}>{saveMsg}</span>}
      </div>

      <div className="admin-filter-tabs" style={{ marginBottom: '1.5rem' }}>
        {tabs.map(t => (
          <button key={t.id} className={`admin-filter-tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Branding */}
      {activeTab === 'branding' && (
        <div className="admin-card">
          <h2 className="admin-card-title">Logo & Site Name</h2>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Site Name</label>
              <input value={settings.siteName} onChange={e => setSettings({...settings, siteName: e.target.value})} />
            </div>
          </div>
          <ImageUpload label="Logo" value={settings.logo} onChange={v => setSettings({...settings, logo: v})} token={token} />
          <button className="admin-btn admin-btn-primary" disabled={saving} onClick={() => saveSection('branding', { logo: settings.logo, siteName: settings.siteName })}>
            {saving ? 'Saving...' : 'Save Branding'}
          </button>
        </div>
      )}

      {/* Offers */}
      {activeTab === 'offers' && (
        <div className="admin-card">
          <h2 className="admin-card-title">Offer Bar Messages</h2>
          <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem' }}>These rotate in the top bar. Add, edit or remove offers.</p>
          {settings.offers.map((offer, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input value={offer} onChange={e => {
                const newOffers = [...settings.offers];
                newOffers[i] = e.target.value;
                setSettings({...settings, offers: newOffers});
              }} style={{ flex: 1, padding: '0.6rem 0.85rem', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontFamily: 'inherit', fontSize: '0.9rem' }} />
              <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => {
                const newOffers = settings.offers.filter((_, idx) => idx !== i);
                setSettings({...settings, offers: newOffers});
              }}>Remove</button>
            </div>
          ))}
          <button className="admin-btn admin-btn-sm admin-btn-secondary" style={{ marginTop: '0.5rem', marginBottom: '1rem' }} onClick={() => setSettings({...settings, offers: [...settings.offers, '']})}>
            + Add Offer
          </button>
          <br />
          <button className="admin-btn admin-btn-primary" disabled={saving} onClick={() => saveSection('offers', { offers: settings.offers.filter(Boolean) })}>
            {saving ? 'Saving...' : 'Save Offers'}
          </button>
        </div>
      )}

      {/* Banners */}
      {activeTab === 'banners' && (
        <div className="admin-card">
          <h2 className="admin-card-title">Hero Banners</h2>
          {settings.heroBanners.map((banner, i) => (
            <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', background: '#fafafa' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <strong style={{ fontSize: '0.9rem' }}>Banner {i + 1}</strong>
                <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => {
                  const b = settings.heroBanners.filter((_, idx) => idx !== i);
                  setSettings({...settings, heroBanners: b});
                }}>Remove</button>
              </div>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Title</label>
                  <input value={banner.title} onChange={e => { const b = [...settings.heroBanners]; b[i] = {...b[i], title: e.target.value}; setSettings({...settings, heroBanners: b}); }} />
                </div>
                <div className="admin-form-group">
                  <label>Subtitle</label>
                  <input value={banner.subtitle} onChange={e => { const b = [...settings.heroBanners]; b[i] = {...b[i], subtitle: e.target.value}; setSettings({...settings, heroBanners: b}); }} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <input value={banner.description} onChange={e => { const b = [...settings.heroBanners]; b[i] = {...b[i], description: e.target.value}; setSettings({...settings, heroBanners: b}); }} />
              </div>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Button Text</label>
                  <input value={banner.cta} onChange={e => { const b = [...settings.heroBanners]; b[i] = {...b[i], cta: e.target.value}; setSettings({...settings, heroBanners: b}); }} />
                </div>
                <div className="admin-form-group">
                  <label>Button Link</label>
                  <input value={banner.link} onChange={e => { const b = [...settings.heroBanners]; b[i] = {...b[i], link: e.target.value}; setSettings({...settings, heroBanners: b}); }} />
                </div>
              </div>
              <ImageUpload label="Banner Image" value={banner.image} onChange={v => { const b = [...settings.heroBanners]; b[i] = {...b[i], image: v}; setSettings({...settings, heroBanners: b}); }} token={token} />
              <div className="admin-form-group">
                <label>Background Color</label>
                <input type="color" value={banner.bgColor} onChange={e => { const b = [...settings.heroBanners]; b[i] = {...b[i], bgColor: e.target.value}; setSettings({...settings, heroBanners: b}); }} />
              </div>
            </div>
          ))}
          <button className="admin-btn admin-btn-sm admin-btn-secondary" style={{ marginBottom: '1rem' }} onClick={() => {
            const newId = settings.heroBanners.length > 0 ? Math.max(...settings.heroBanners.map(b => b.id || 0)) + 1 : 1;
            setSettings({...settings, heroBanners: [...settings.heroBanners, { id: newId, title: '', subtitle: '', description: '', cta: 'Shop Now', link: '/', image: '', bgColor: '#f0f0f0' }]});
          }}>
            + Add Banner
          </button>
          <br />
          <button className="admin-btn admin-btn-primary" disabled={saving} onClick={() => saveSection('banners', { heroBanners: settings.heroBanners })}>
            {saving ? 'Saving...' : 'Save Banners'}
          </button>
        </div>
      )}

      {/* About Us */}
      {activeTab === 'about' && (
        <div className="admin-card">
          <h2 className="admin-card-title">About Us Section</h2>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Badge Text</label>
              <input value={settings.aboutUs.badge} onChange={e => setSettings({...settings, aboutUs: {...settings.aboutUs, badge: e.target.value}})} />
            </div>
            <div className="admin-form-group">
              <label>Title</label>
              <input value={settings.aboutUs.title} onChange={e => setSettings({...settings, aboutUs: {...settings.aboutUs, title: e.target.value}})} />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Paragraphs</label>
            {settings.aboutUs.paragraphs.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <textarea value={p} rows="2" onChange={e => {
                  const paras = [...settings.aboutUs.paragraphs]; paras[i] = e.target.value;
                  setSettings({...settings, aboutUs: {...settings.aboutUs, paragraphs: paras}});
                }} style={{ flex: 1, padding: '0.6rem', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontFamily: 'inherit', fontSize: '0.9rem' }} />
                <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => {
                  const paras = settings.aboutUs.paragraphs.filter((_, idx) => idx !== i);
                  setSettings({...settings, aboutUs: {...settings.aboutUs, paragraphs: paras}});
                }}>✕</button>
              </div>
            ))}
            <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => setSettings({...settings, aboutUs: {...settings.aboutUs, paragraphs: [...settings.aboutUs.paragraphs, '']}})}>+ Add Paragraph</button>
          </div>

          <div className="admin-form-group">
            <label>Features (checkmark list)</label>
            {settings.aboutUs.features.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input value={f} onChange={e => {
                  const feats = [...settings.aboutUs.features]; feats[i] = e.target.value;
                  setSettings({...settings, aboutUs: {...settings.aboutUs, features: feats}});
                }} style={{ flex: 1, padding: '0.6rem', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontFamily: 'inherit', fontSize: '0.9rem' }} />
                <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => {
                  const feats = settings.aboutUs.features.filter((_, idx) => idx !== i);
                  setSettings({...settings, aboutUs: {...settings.aboutUs, features: feats}});
                }}>✕</button>
              </div>
            ))}
            <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => setSettings({...settings, aboutUs: {...settings.aboutUs, features: [...settings.aboutUs.features, '']}})}>+ Add Feature</button>
          </div>

          <div className="admin-form-group">
            <label>Stats Cards</label>
            {settings.aboutUs.stats.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                <input value={s.icon} onChange={e => {
                  const stats = [...settings.aboutUs.stats]; stats[i] = {...stats[i], icon: e.target.value};
                  setSettings({...settings, aboutUs: {...settings.aboutUs, stats}});
                }} style={{ width: '50px', padding: '0.6rem', border: '1.5px solid #e5e7eb', borderRadius: '8px', textAlign: 'center', fontSize: '1.2rem' }} placeholder="🌿" />
                <input value={s.value} onChange={e => {
                  const stats = [...settings.aboutUs.stats]; stats[i] = {...stats[i], value: e.target.value};
                  setSettings({...settings, aboutUs: {...settings.aboutUs, stats}});
                }} style={{ flex: 1, padding: '0.6rem', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontFamily: 'inherit' }} placeholder="Value" />
                <input value={s.label} onChange={e => {
                  const stats = [...settings.aboutUs.stats]; stats[i] = {...stats[i], label: e.target.value};
                  setSettings({...settings, aboutUs: {...settings.aboutUs, stats}});
                }} style={{ flex: 1, padding: '0.6rem', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontFamily: 'inherit' }} placeholder="Label" />
                <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => {
                  const stats = settings.aboutUs.stats.filter((_, idx) => idx !== i);
                  setSettings({...settings, aboutUs: {...settings.aboutUs, stats}});
                }}>✕</button>
              </div>
            ))}
            <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => setSettings({...settings, aboutUs: {...settings.aboutUs, stats: [...settings.aboutUs.stats, {icon: '', value: '', label: ''}]}})}>+ Add Stat</button>
          </div>

          <button className="admin-btn admin-btn-primary" disabled={saving} style={{ marginTop: '1rem' }} onClick={() => saveSection('about', { aboutUs: settings.aboutUs })}>
            {saving ? 'Saving...' : 'Save About Us'}
          </button>
        </div>
      )}

      {/* Reviews */}
      {activeTab === 'reviews' && (
        <div className="admin-card">
          <h2 className="admin-card-title">Customer Reviews</h2>
          {settings.reviews.map((review, i) => (
            <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', background: '#fafafa' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <strong style={{ fontSize: '0.9rem' }}>Review {i + 1}</strong>
                <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => {
                  const r = settings.reviews.filter((_, idx) => idx !== i);
                  setSettings({...settings, reviews: r});
                }}>Remove</button>
              </div>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Customer Name</label>
                  <input value={review.name} onChange={e => { const r = [...settings.reviews]; r[i] = {...r[i], name: e.target.value}; setSettings({...settings, reviews: r}); }} />
                </div>
                <div className="admin-form-group">
                  <label>Avatar (initials)</label>
                  <input value={review.avatar} onChange={e => { const r = [...settings.reviews]; r[i] = {...r[i], avatar: e.target.value}; setSettings({...settings, reviews: r}); }} />
                </div>
              </div>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Product</label>
                  <input value={review.product} onChange={e => { const r = [...settings.reviews]; r[i] = {...r[i], product: e.target.value}; setSettings({...settings, reviews: r}); }} />
                </div>
                <div className="admin-form-group">
                  <label>Rating (1-5)</label>
                  <select value={review.rating} onChange={e => { const r = [...settings.reviews]; r[i] = {...r[i], rating: Number(e.target.value)}; setSettings({...settings, reviews: r}); }}
                    style={{ padding: '0.6rem', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontFamily: 'inherit' }}>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-form-group">
                <label>Review Text</label>
                <textarea value={review.text} rows="2" onChange={e => { const r = [...settings.reviews]; r[i] = {...r[i], text: e.target.value}; setSettings({...settings, reviews: r}); }}
                  style={{ width: '100%', padding: '0.6rem', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontFamily: 'inherit', fontSize: '0.9rem' }} />
              </div>
            </div>
          ))}
          <button className="admin-btn admin-btn-sm admin-btn-secondary" style={{ marginBottom: '1rem' }} onClick={() => {
            const newId = settings.reviews.length > 0 ? Math.max(...settings.reviews.map(r => r.id || 0)) + 1 : 1;
            setSettings({...settings, reviews: [...settings.reviews, { id: newId, name: '', rating: 5, text: '', product: '', avatar: '' }]});
          }}>
            + Add Review
          </button>
          <br />
          <button className="admin-btn admin-btn-primary" disabled={saving} onClick={() => saveSection('reviews', { reviews: settings.reviews })}>
            {saving ? 'Saving...' : 'Save Reviews'}
          </button>
        </div>
      )}
      {/* Social Links & WhatsApp */}
      {activeTab === 'social' && (
        <div className="admin-card">
          <h2 className="admin-card-title">Social Media Links</h2>
          <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem' }}>Add your social media URLs. Leave blank to hide the icon in the footer.</p>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Instagram URL</label>
              <input value={settings.socialLinks?.instagram || ''} placeholder="https://instagram.com/yourpage" onChange={e => setSettings({...settings, socialLinks: {...(settings.socialLinks || {}), instagram: e.target.value}})} />
            </div>
            <div className="admin-form-group">
              <label>Facebook URL</label>
              <input value={settings.socialLinks?.facebook || ''} placeholder="https://facebook.com/yourpage" onChange={e => setSettings({...settings, socialLinks: {...(settings.socialLinks || {}), facebook: e.target.value}})} />
            </div>
          </div>
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Twitter / X URL</label>
              <input value={settings.socialLinks?.twitter || ''} placeholder="https://twitter.com/yourhandle" onChange={e => setSettings({...settings, socialLinks: {...(settings.socialLinks || {}), twitter: e.target.value}})} />
            </div>
            <div className="admin-form-group">
              <label>YouTube URL</label>
              <input value={settings.socialLinks?.youtube || ''} placeholder="https://youtube.com/yourchannel" onChange={e => setSettings({...settings, socialLinks: {...(settings.socialLinks || {}), youtube: e.target.value}})} />
            </div>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '1.5rem 0' }} />
          <h2 className="admin-card-title">WhatsApp Number</h2>
          <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem' }}>This number is used for the "Order Now" button on product pages. Include country code without + (e.g. 919584251250).</p>
          <div className="admin-form-group">
            <label>WhatsApp Number</label>
            <input value={settings.whatsappNumber || ''} placeholder="919584251250" onChange={e => setSettings({...settings, whatsappNumber: e.target.value})} />
          </div>
          <button className="admin-btn admin-btn-primary" disabled={saving} style={{ marginTop: '1rem' }} onClick={() => saveSection('social', { socialLinks: settings.socialLinks || {}, whatsappNumber: settings.whatsappNumber || '' })}>
            {saving ? 'Saving...' : 'Save Social & WhatsApp'}
          </button>
        </div>
      )}

      {/* Video Ads */}
      {activeTab === 'videoAds' && (
        <VideoAdsTab settings={settings} setSettings={setSettings} saving={saving} saveSection={saveSection} token={token} />
      )}
    </div>
  );
}

function VideoAdsTab({ settings, setSettings, saving, saveSection, token }) {
  const [uploading, setUploading] = useState(null);
  const [products, setProducts] = useState([]);
  const fileRefs = useRef({});

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(r => r.json())
      .then(data => setProducts(data))
      .catch(() => {});
  }, []);

  const videoAds = settings.videoAds || [];

  const updateAds = (newAds) => {
    setSettings(prev => ({ ...prev, videoAds: newAds }));
  };

  const handleVideoUpload = async (index, file) => {
    if (!file) return;
    setUploading(index);
    const formData = new FormData();
    formData.append('video', file);
    try {
      const res = await fetch(`${API_URL}/upload/video`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setSettings(prev => {
          const ads = [...(prev.videoAds || [])];
          ads[index] = { ...ads[index], videoUrl: data.url };
          return { ...prev, videoAds: ads };
        });
      }
    } catch {
      alert('Failed to upload video');
    } finally {
      setUploading(null);
    }
  };

  const handleRemove = (index) => {
    setSettings(prev => ({
      ...prev,
      videoAds: (prev.videoAds || []).filter((_, idx) => idx !== index)
    }));
  };

  return (
    <div className="admin-card">
      <h2 className="admin-card-title">Video Ads (Trending Section)</h2>
      <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem' }}>
        Add product videos that auto-play in the "Trending Now" section. Videos play silently and open in a popup on click.
      </p>

      {videoAds.map((ad, i) => (
        <div key={ad.id || i} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', background: '#fafafa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <strong style={{ fontSize: '0.9rem' }}>Video Ad {i + 1}</strong>
            <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => handleRemove(i)}>Remove</button>
          </div>

          <div className="admin-form-group" style={{ marginBottom: '0.75rem' }}>
            <label>Title</label>
            <input value={ad.title || ''} placeholder="Product video title" onChange={e => {
              const ads = [...videoAds]; ads[i] = { ...ads[i], title: e.target.value };
              updateAds(ads);
            }} />
          </div>

          <div className="admin-form-group" style={{ marginBottom: '0.75rem' }}>
            <label>Video</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                value={ad.videoUrl || ''}
                placeholder="Paste video URL or upload below"
                onChange={e => {
                  const ads = [...videoAds]; ads[i] = { ...ads[i], videoUrl: e.target.value };
                  updateAds(ads);
                }}
                style={{ flex: 1, padding: '0.6rem 0.85rem', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontFamily: 'inherit', fontSize: '0.9rem' }}
              />
              <input
                type="file"
                accept="video/*"
                ref={el => fileRefs.current[i] = el}
                style={{ display: 'none' }}
                onChange={e => handleVideoUpload(i, e.target.files[0])}
              />
              <button
                className="admin-btn admin-btn-sm admin-btn-secondary"
                onClick={() => fileRefs.current[i]?.click()}
                disabled={uploading === i}
              >
                {uploading === i ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            {ad.videoUrl && (
              <video src={ad.videoUrl.startsWith('http') ? ad.videoUrl : `${API_URL.replace('/api', '')}${ad.videoUrl}`} style={{ width: '120px', height: '160px', objectFit: 'cover', marginTop: '0.5rem', borderRadius: '8px', background: '#000' }} muted autoPlay loop playsInline />
            )}
          </div>

          <div className="admin-form-group">
            <label>Link to Product</label>
            <select
              value={ad.productId || ''}
              onChange={e => {
                const ads = [...videoAds]; ads[i] = { ...ads[i], productId: e.target.value };
                updateAds(ads);
              }}
              style={{ padding: '0.6rem 0.85rem', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontFamily: 'inherit', fontSize: '0.9rem', background: '#fff' }}
            >
              <option value="">-- No product linked --</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.price})</option>
              ))}
            </select>
          </div>
        </div>
      ))}

      <button className="admin-btn admin-btn-sm admin-btn-secondary" style={{ marginBottom: '1rem' }} onClick={() => {
        const newId = videoAds.length > 0 ? Math.max(...videoAds.map(a => a.id || 0)) + 1 : 1;
        updateAds([...videoAds, { id: newId, title: '', videoUrl: '', productId: '' }]);
      }}>
        + Add Video Ad
      </button>
      <br />
      <button className="admin-btn admin-btn-primary" disabled={saving} onClick={() => saveSection('videoAds', { videoAds: settings.videoAds || [] })}>
        {saving ? 'Saving...' : 'Save Video Ads'}
      </button>
    </div>
  );
}

export default AdminSettings;
