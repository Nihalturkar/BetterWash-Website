import { useScrollReveal, useStaggerReveal } from '../../hooks/useScrollReveal'
import './Categories.css'

const categories = [
  {
    id: 1,
    name: 'Shampoo',
    emoji: '🧴',
    count: '12 Products',
    description: 'Nourishing hair care solutions',
    color: '#b8860b',
  },
  {
    id: 2,
    name: 'Body Wash',
    emoji: '🛁',
    count: '8 Products',
    description: 'Refreshing body cleansers',
    color: '#d4a017',
  },
  {
    id: 3,
    name: 'Moisturizer',
    emoji: '💧',
    count: '10 Products',
    description: 'Deep hydration formulas',
    color: '#e8c547',
  },
  {
    id: 4,
    name: 'Face Cleanser',
    emoji: '🧼',
    count: '9 Products',
    description: 'Gentle facial care',
    color: '#c9942e',
  },
  {
    id: 5,
    name: 'Herbal Products',
    emoji: '🌿',
    count: '15 Products',
    description: '100% natural ingredients',
    color: '#b8860b',
  },
]

function Categories() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [gridRef, gridVisible] = useStaggerReveal(categories.length)

  return (
    <section className="categories" id="categories">
      <div className="categories-container">
        <div className={`section-header ${headerVisible ? 'revealed' : ''}`} ref={headerRef}>
          <span className="section-badge">Browse</span>
          <h2 className="section-title">Product Categories</h2>
          <p className="section-description">
            Explore our wide range of premium skincare and hygiene products.
          </p>
        </div>

        <div className={`categories-grid ${gridVisible ? 'revealed' : ''}`} ref={gridRef}>
          {categories.map((cat, index) => (
            <div
              className="category-card"
              key={cat.id}
              style={{ '--delay': `${index * 0.1}s`, '--accent': cat.color }}
            >
              <div className="category-bg-gradient"></div>
              <div className="category-icon" style={{ background: `${cat.color}12` }}>
                <span>{cat.emoji}</span>
              </div>
              <h3 className="category-name">{cat.name}</h3>
              <p className="category-desc">{cat.description}</p>
              <span className="category-count" style={{ color: cat.color }}>{cat.count}</span>
              <div className="category-arrow" style={{ background: cat.color }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
