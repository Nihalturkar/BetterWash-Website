import { useScrollReveal } from '../../hooks/useScrollReveal'
import './About.css'

function About() {
  const [leftRef, leftVisible] = useScrollReveal()
  const [rightRef, rightVisible] = useScrollReveal()

  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className={`about-visual ${leftVisible ? 'revealed' : ''}`} ref={leftRef}>
          <div className="about-card-stack">
            <div className="about-stat-card">
              <div className="about-stat-icon-wrap about-stat-icon-1">
                <span className="about-stat-icon">🌿</span>
              </div>
              <div>
                <span className="about-stat-num">100%</span>
                <span className="about-stat-text">Natural Ingredients</span>
              </div>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-icon-wrap about-stat-icon-2">
                <span className="about-stat-icon">🔬</span>
              </div>
              <div>
                <span className="about-stat-num">Lab Tested</span>
                <span className="about-stat-text">Dermatologist Approved</span>
              </div>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-icon-wrap about-stat-icon-3">
                <span className="about-stat-icon">🐰</span>
              </div>
              <div>
                <span className="about-stat-num">Cruelty Free</span>
                <span className="about-stat-text">No Animal Testing</span>
              </div>
            </div>
            <div className="about-stat-card">
              <div className="about-stat-icon-wrap about-stat-icon-4">
                <span className="about-stat-icon">♻️</span>
              </div>
              <div>
                <span className="about-stat-num">Eco-Friendly</span>
                <span className="about-stat-text">Sustainable Packaging</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`about-content ${rightVisible ? 'revealed' : ''}`} ref={rightRef}>
          <span className="section-badge">Our Story</span>
          <h2 className="section-title about-title">About BetterWash</h2>
          <p className="about-text">
            BetterWash was born from a simple belief — everyone deserves access to premium,
            natural skincare products. Founded in 2023, we set out to create a brand that
            combines the best of nature and science.
          </p>
          <p className="about-text">
            Our products are crafted with carefully selected natural ingredients, free from
            harmful chemicals, and designed to deliver real results. From our herbal shampoos
            to our hydrating moisturizers, every product reflects our commitment to quality
            and your well-being.
          </p>
          <div className="about-features">
            <div className="about-feature">
              <span className="feature-check">✓</span>
              <span>Paraben & Sulphate Free</span>
            </div>
            <div className="about-feature">
              <span className="feature-check">✓</span>
              <span>Dermatologically Tested</span>
            </div>
            <div className="about-feature">
              <span className="feature-check">✓</span>
              <span>Suitable for All Skin Types</span>
            </div>
            <div className="about-feature">
              <span className="feature-check">✓</span>
              <span>Made in India</span>
            </div>
          </div>
          <a href="#products" className="btn btn-primary">
            <span>Explore Products</span>
            <span className="btn-shine"></span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default About
