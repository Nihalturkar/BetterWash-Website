import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../../components/SEO/SEOHead';
import '../../components/Products/Products.css';
import './CategoryDetail.css';

import { API_URL } from '../../config';

function CategoryDetail() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([
      fetch(`${API_URL}/products`).then(r => r.json()),
      fetch(`${API_URL}/categories`).then(r => r.json())
    ])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
        setLoading(false);
      })
      .catch(() => {
        import('../../data/products').then(m => {
          setProducts(m.products);
          setCategories(m.categories);
          setLoading(false);
        });
      });
  }, [slug]);

  if (loading) return <div className="category-detail-container" style={{paddingTop: '100px'}}>Loading...</div>;

  // Match by slug first, then fall back to name match
  const categoryInfo = categories.find(c => c.slug === slug) ||
    categories.find(c => c.name.toLowerCase() === slug.toLowerCase()) ||
    { name: slug, slug: slug, color: '#008b8b', image: '', description: 'Explore our products' };

  const categoryProducts = products.filter(p =>
    p.category.toLowerCase() === categoryInfo.name.toLowerCase()
  );

  return (
    <div className="category-detail-container">
      <SEOHead
        title={`${categoryInfo.name} - Premium ${categoryInfo.name} Products | BetterWash`}
        description={`Shop premium ${categoryInfo.name.toLowerCase()} products at BetterWash India. ${categoryInfo.description}. Natural, paraben-free skincare.`}
        keywords={`${categoryInfo.name}, ${categoryInfo.name.toLowerCase()} products, natural ${categoryInfo.name.toLowerCase()}, BetterWash`}
        canonicalUrl={`/category/${categoryInfo.slug || slug}`}
      />

      <div className="category-header" style={{ backgroundColor: categoryInfo.color }}>
        <div className="category-header-bg"></div>
        <div className="category-header-content">
          {categoryInfo.image && (
            <img src={categoryInfo.image} alt={categoryInfo.name} className="category-header-img" />
          )}
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
              <div className="product-image-box">
                <img src={product.image} alt={product.name} className="product-img" />
                <span className="product-discount">
                  {Math.round((1 - product.numericPrice / parseInt(product.originalPrice.replace('₹', ''))) * 100)}% OFF
                </span>
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
                  to={`/product/${product.slug || product.id}`}
                  className="product-btn"
                  style={{ background: product.color }}
                >
                  <span>View</span>
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
