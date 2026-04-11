import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, categories } from '../../data/products';
import '../../components/Products/Products.css'; // Reuse product card styles
import './CategoryDetail.css';

function CategoryDetail() {
  const { categoryId } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  const categoryInfo = categories.find(c => c.name.toLowerCase() === categoryId.toLowerCase()) || 
    { name: categoryId, color: '#4CAF50', emoji: '✨', description: 'Explore our products' };

  const categoryProducts = products.filter(p => p.category.toLowerCase() === categoryId.toLowerCase());

  return (
    <div className="category-detail-container">
      <div className="category-header" style={{ backgroundColor: categoryInfo.color }}>
        <div className="category-header-bg"></div>
        <div className="category-header-content">
          <span className="category-large-emoji">{categoryInfo.emoji}</span>
          <h1 className="category-title">{categoryInfo.name}</h1>
          <p className="category-subtitle">{categoryInfo.description}</p>
        </div>
      </div>

      {categoryProducts.length === 0 ? (
        <div className="no-products">
          No products found in this category.
        </div>
      ) : (
        <div className="products-grid revealed">
          {categoryProducts.map((product, index) => (
            <div
              className="product-card"
              key={product.id}
              style={{ '--delay': `${index * 0.1}s`, '--accent': product.color }}
            >
              <div className="product-card-glow"></div>
              <div className="product-emoji" style={{ background: `${product.color}15` }}>
                <span>{product.emoji}</span>
              </div>
              <span className="product-category">{product.category}</span>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-benefits">
                {product.benefits.map((benefit, i) => (
                  <span key={i} className="benefit-tag">{benefit}</span>
                ))}
              </div>
              <div className="product-footer">
                <div className="product-price">
                  <span className="current-price">{product.price}</span>
                  <span className="original-price">{product.originalPrice}</span>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="product-btn"
                  style={{ background: product.color }}
                >
                  <span>View Details</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryDetail;
