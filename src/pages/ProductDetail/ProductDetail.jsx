import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Scroll to top when loading new product
    window.scrollTo(0, 0);
    const prod = products.find(p => p.id === parseInt(id));
    setProduct(prod);
  }, [id]);

  if (!product) return <div className="product-detail-container" style={{paddingTop: '100px'}}>Loading...</div>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Could add a toast notification here
    alert(`${quantity} ${product.name} added to cart!`);
  };

  const incrementQty = () => setQuantity(prev => prev + 1);
  const decrementQty = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="product-detail-container">
      <div className="product-image-section">
        <div className="product-large-emoji" style={{ color: product.color }}>
          {product.emoji}
        </div>
      </div>

      <div className="product-info-section">
        <div className="product-breadcrumb">
          <Link to="/">Home</Link> 
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          <Link to={`/category/${product.category}`}>{product.category}</Link>
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

        <ul className="features-list">
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

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

        <div className="stock-status">
          <span className="in-stock-dot"></span>
          In Stock - Usually dispatches within 24 hours
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
