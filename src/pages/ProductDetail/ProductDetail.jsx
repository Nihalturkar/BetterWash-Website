import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';
import SEOHead, { getProductJsonLd } from '../../components/SEO/SEOHead';
import './ProductDetail.css';

import { API_URL } from '../../config';

function ProductDetail() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { settings } = useSettings();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState({ name: '', phone: '', address: '', city: '', pincode: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_URL}/products/${slug}`)
      .then(r => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(data => {
        if (!data || data.message) throw new Error('Invalid product');
        setProduct(data);
      })
      .catch(() => {
        import('../../data/products').then(m => {
          const prod = m.products.find(p => p.slug === slug || p.id === parseInt(slug));
          setProduct(prod || null);
        });
      });
  }, [slug]);

  if (!product) return <div className="product-detail-container" style={{paddingTop: '100px'}}>Loading...</div>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} ${product.name} added to cart!`);
  };

  const incrementQty = () => setQuantity(prev => prev + 1);
  const decrementQty = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleOrderNow = (e) => {
    e.preventDefault();
    const whatsappNumber = settings?.whatsappNumber || '919584251250';
    const message = `*New Order - BetterWash*%0A%0A*Product:* ${product.name}%0A*Qty:* ${quantity}%0A*Price:* ${product.price}%0A%0A*Customer Details:*%0AName: ${orderForm.name}%0APhone: ${orderForm.phone}%0AAddress: ${orderForm.address}%0ACity: ${orderForm.city}%0APincode: ${orderForm.pincode}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    setShowOrderForm(false);
    setOrderForm({ name: '', phone: '', address: '', city: '', pincode: '' });
  };

  const seo = product.seo || {};

  return (
    <div className="product-detail-container">
      <SEOHead
        title={seo.metaTitle || `${product.name} - ${product.category} | BetterWash`}
        description={seo.metaDescription || product.longDescription || product.description}
        keywords={seo.metaKeywords || `${product.name}, ${product.category}, BetterWash`}
        canonicalUrl={`/product/${product.slug}`}
        ogType="product"
        ogImage={product.image}
        jsonLd={getProductJsonLd(product)}
      />

      <div className="product-image-section">
        <img src={product.image} alt={product.name} className="product-detail-img" />
      </div>

      <div className="product-info-section">
        <div className="product-breadcrumb">
          <Link to="/">Home</Link>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          <Link to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`}>{product.category}</Link>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          <span>{product.name}</span>
        </div>

        <span className="detail-category" style={{ color: product.color }}>
          {product.category}
        </span>

        <h1 className="detail-title">{product.name}</h1>

        <div className="detail-rating">
          <div className="stars">
            {'★'.repeat(Math.floor(product.rating))}
            {product.rating % 1 !== 0 ? '½' : ''}
          </div>
          <span>{product.rating}</span>
          <span className="reviews-count">({product.reviews} reviews)</span>
        </div>

        <div className="detail-price-box">
          <span className="detail-price">{product.price}</span>
          <span className="detail-original">{product.originalPrice}</span>
        </div>

        <p className="detail-description">{product.longDescription}</p>

        {product.features && product.features.length > 0 && (
          <ul className="features-list">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}

        <div className="action-section">
          <div className="quantity-selector">
            <button className="qty-btn" onClick={decrementQty}>-</button>
            <input
              type="text"
              className="qty-input"
              value={quantity}
              readOnly
            />
            <button className="qty-btn" onClick={incrementQty}>+</button>
          </div>

          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            style={{ backgroundColor: product.color }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Add to Cart
          </button>
        </div>

        <button
          className="order-now-btn"
          onClick={() => setShowOrderForm(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Order Now via WhatsApp
        </button>

        <div className="stock-status">
          <span className="in-stock-dot"></span>
          In Stock - Usually dispatches within 24 hours
        </div>
      </div>

      {/* Order Now Modal */}
      {showOrderForm && (
        <div className="order-modal-backdrop" onClick={() => setShowOrderForm(false)}>
          <div className="order-modal" onClick={e => e.stopPropagation()}>
            <button className="order-modal-close" onClick={() => setShowOrderForm(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="order-modal-header">
              <h2>Order via WhatsApp</h2>
              <div className="order-modal-product">
                <img src={product.image} alt={product.name} />
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price} x {quantity}</span>
                </div>
              </div>
            </div>
            <form className="order-modal-form" onSubmit={handleOrderNow}>
              <div className="order-form-group">
                <label>Full Name</label>
                <input type="text" value={orderForm.name} onChange={e => setOrderForm({...orderForm, name: e.target.value})} required placeholder="Your full name" />
              </div>
              <div className="order-form-group">
                <label>Phone Number</label>
                <input type="tel" value={orderForm.phone} onChange={e => setOrderForm({...orderForm, phone: e.target.value})} required placeholder="Your phone number" />
              </div>
              <div className="order-form-group">
                <label>Delivery Address</label>
                <textarea value={orderForm.address} onChange={e => setOrderForm({...orderForm, address: e.target.value})} required placeholder="Full delivery address" rows="2" />
              </div>
              <div className="order-form-row">
                <div className="order-form-group">
                  <label>City</label>
                  <input type="text" value={orderForm.city} onChange={e => setOrderForm({...orderForm, city: e.target.value})} required placeholder="City" />
                </div>
                <div className="order-form-group">
                  <label>Pincode</label>
                  <input type="text" value={orderForm.pincode} onChange={e => setOrderForm({...orderForm, pincode: e.target.value})} required placeholder="Pincode" />
                </div>
              </div>
              <button type="submit" className="order-submit-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 0 0 .612.616l4.532-1.474A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.33 0-4.49-.764-6.237-2.056l-.436-.332-2.686.874.893-2.628-.365-.458A9.706 9.706 0 0 1 2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/>
                </svg>
                Send Order on WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
