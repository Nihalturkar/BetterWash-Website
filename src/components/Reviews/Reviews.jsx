import { useScrollReveal, useStaggerReveal } from '../../hooks/useScrollReveal'
import './Reviews.css'

const reviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    rating: 5,
    text: 'BetterWash shampoo has completely transformed my hair! It feels so soft and healthy after just 2 weeks of use. Absolutely love it!',
    product: 'Herbal Shampoo',
    avatar: 'PS',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    rating: 5,
    text: 'The body wash smells amazing and leaves my skin feeling fresh all day. The natural ingredients make a real difference. Highly recommend!',
    product: 'Refresh Body Wash',
    avatar: 'RV',
  },
  {
    id: 3,
    name: 'Anita Patel',
    rating: 4,
    text: 'I have sensitive skin and was worried about trying new products. BetterWash moisturizer is gentle yet effective. My skin has never felt better!',
    product: 'Hydra Moisturizer',
    avatar: 'AP',
  },
  {
    id: 4,
    name: 'Vikash Kumar',
    rating: 5,
    text: 'The face cleanser cleared my acne in just a month. Premium quality at affordable prices. BetterWash is now my go-to brand!',
    product: 'Glow Face Cleanser',
    avatar: 'VK',
  },
  {
    id: 5,
    name: 'Neha Gupta',
    rating: 5,
    text: 'Love the neem face pack! It controls my oily skin perfectly. The fact that it\'s 100% natural makes it even better. Great product!',
    product: 'Neem Face Pack',
    avatar: 'NG',
  },
  {
    id: 6,
    name: 'Arjun Singh',
    rating: 4,
    text: 'The rose body lotion is incredibly luxurious. The fragrance lasts all day and my skin stays moisturized. Worth every rupee!',
    product: 'Rose Body Lotion',
    avatar: 'AS',
  },
]

function Reviews() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [gridRef, gridVisible] = useStaggerReveal(reviews.length)

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
