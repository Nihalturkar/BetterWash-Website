import { useScrollReveal, useStaggerReveal } from '../../hooks/useScrollReveal'
import './Categories.css'

import { Link } from 'react-router-dom'
import { categories } from '../../data/products'

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
            <Link
              to={`/category/${cat.name}`}
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
