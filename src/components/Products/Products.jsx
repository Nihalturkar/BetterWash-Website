import { useScrollReveal, useStaggerReveal } from '../../hooks/useScrollReveal'
import './Products.css'

import { Link } from 'react-router-dom'
import { products } from '../../data/products'

function Products() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [gridRef, gridVisible] = useStaggerReveal(products.length)

  return (
    <section className="products" id="products">
      <div className="products-container">
        <div className={`section-header ${headerVisible ? 'revealed' : ''}`} ref={headerRef}>
          <span className="section-badge">Our Collection</span>
          <h2 className="section-title">Bestsellers</h2>
          <p className="section-description">
            Handpicked premium products crafted with natural ingredients for your daily care routine.
          </p>
        </div>

        <div className={`products-grid ${gridVisible ? 'revealed' : ''}`} ref={gridRef}>
          {products.map((product, index) => (
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
                  to={`/product/${product.id}`}
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
      </div>
    </section>
  )
}

export default Products
