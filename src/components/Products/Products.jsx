import { useScrollReveal, useStaggerReveal } from '../../hooks/useScrollReveal'
import './Products.css'

const products = [
  {
    id: 1,
    name: 'Herbal Shampoo',
    category: 'Hair Care',
    price: '₹349',
    originalPrice: '₹499',
    description: 'Gentle cleansing with natural herbs for silky smooth hair.',
    benefits: ['Reduces Hair Fall', 'Adds Shine', 'Paraben Free'],
    emoji: '🧴',
    color: '#b8860b',
  },
  {
    id: 2,
    name: 'Refresh Body Wash',
    category: 'Body Care',
    price: '₹299',
    originalPrice: '₹449',
    description: 'Energizing body wash with aloe vera and vitamin E.',
    benefits: ['Deep Cleansing', 'Moisturizing', 'Fresh Fragrance'],
    emoji: '🛁',
    color: '#d4a017',
  },
  {
    id: 3,
    name: 'Hydra Moisturizer',
    category: 'Skin Care',
    price: '₹449',
    originalPrice: '₹599',
    description: '24-hour hydration with hyaluronic acid and shea butter.',
    benefits: ['Deep Hydration', 'Non-Greasy', 'All Skin Types'],
    emoji: '💧',
    color: '#e8c547',
  },
  {
    id: 4,
    name: 'Glow Face Cleanser',
    category: 'Face Care',
    price: '₹399',
    originalPrice: '₹549',
    description: 'Brightening face cleanser with vitamin C and niacinamide.',
    benefits: ['Brightening', 'Pore Cleansing', 'Gentle Formula'],
    emoji: '🧼',
    color: '#b8860b',
  },
  {
    id: 5,
    name: 'Neem Face Pack',
    category: 'Herbal',
    price: '₹279',
    originalPrice: '₹399',
    description: 'Pure neem extract face pack for clear and healthy skin.',
    benefits: ['Anti-Acne', 'Oil Control', '100% Natural'],
    emoji: '🌿',
    color: '#d4a017',
  },
  {
    id: 6,
    name: 'Rose Body Lotion',
    category: 'Body Care',
    price: '₹329',
    originalPrice: '₹479',
    description: 'Luxurious rose-infused body lotion for soft, fragrant skin.',
    benefits: ['Long Lasting', 'Soft Skin', 'Rose Extract'],
    emoji: '🌹',
    color: '#e8c547',
  },
]

function Products() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [gridRef, gridVisible] = useStaggerReveal(products.length)

  return (
    <section className="products" id="products">
      <div className="products-container">
        <div className={`section-header ${headerVisible ? 'revealed' : ''}`} ref={headerRef}>
          <span className="section-badge">Our Collection</span>
          <h2 className="section-title">Featured Products</h2>
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
                <a
                  href={`https://wa.me/919584251250?text=${encodeURIComponent(`Hi! I'm interested in *${product.name}* (${product.price}).\n\n${product.description}\n\nPlease share more details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="product-btn"
                  style={{ background: product.color }}
                >
                  <span>View Details</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
