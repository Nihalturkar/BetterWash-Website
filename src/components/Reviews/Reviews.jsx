import { useScrollReveal, useStaggerReveal } from '../../hooks/useScrollReveal'
import { useSettings } from '../../context/SettingsContext'
import './Reviews.css'

function Reviews() {
  const { settings } = useSettings()
  const reviews = settings?.reviews || []

  const [headerRef, headerVisible] = useScrollReveal()
  const [gridRef, gridVisible] = useStaggerReveal(reviews.length)

  if (reviews.length === 0) return null

  return (
    <section className="reviews" id="reviews">
      <div className="reviews-container">
        <div className={`section-header ${headerVisible ? 'revealed' : ''}`} ref={headerRef}>
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-description">
            Real reviews from real customers who trust BetterWash for their daily care.
          </p>
        </div>

        <div className={`reviews-grid ${gridVisible ? 'revealed' : ''}`} ref={gridRef}>
          {reviews.map((review, index) => (
            <div className="review-card" key={review.id} style={{ '--delay': `${index * 0.1}s` }}>
              <div className="review-stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-footer">
                <div className="review-avatar">{review.avatar}</div>
                <div className="review-info">
                  <span className="review-name">{review.name}</span>
                  <span className="review-product">Purchased: {review.product}</span>
                </div>
                <span className="review-verified">✓ Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews
