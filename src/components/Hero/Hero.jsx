import { useEffect, useState } from 'react'
import './Hero.css'

function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className={`hero ${loaded ? 'hero-loaded' : ''}`} id="home">
      {/* Animated background blobs */}
      <div className="hero-bg-effects">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-badge">
            <span className="badge-dot"></span>
            Premium Skincare
            <span className="badge-shimmer"></span>
          </span>
          <h1 className="hero-title">
            <span className="title-line">Discover the</span>
            <span className="title-line">
              <span className="highlight">BetterWash</span> Difference
            </span>
          </h1>
          <p className="hero-description">
            High-quality skincare and hygiene products crafted with natural ingredients.
            Experience the perfect blend of science and nature for your daily care routine.
          </p>
          <div className="hero-buttons">
            <a href="#products" className="btn btn-primary">
              <span>Explore Products</span>
              <span className="btn-shine"></span>
            </a>
            <a href="#about" className="btn btn-secondary">
              <span>Our Story</span>
              <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Natural</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <div className="hero-ring hero-ring-1"></div>
            <div className="hero-ring hero-ring-2"></div>
            <div className="hero-ring hero-ring-3"></div>
            <div className="floating-card card-1">
              <span className="card-emoji">🧴</span>
              <div>
                <span className="card-label">Shampoo</span>
                <span className="card-sub">Natural herbs</span>
              </div>
            </div>
            <div className="floating-card card-2">
              <span className="card-emoji">🛁</span>
              <div>
                <span className="card-label">Body Wash</span>
                <span className="card-sub">Aloe vera</span>
              </div>
            </div>
            <div className="floating-card card-3">
              <span className="card-emoji">💧</span>
              <div>
                <span className="card-label">Moisturizer</span>
                <span className="card-sub">Shea butter</span>
              </div>
            </div>
            <div className="center-icon">
              <span>✨</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
