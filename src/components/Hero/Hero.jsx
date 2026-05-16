import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSettings } from '../../context/SettingsContext'
import './Hero.css'

function Hero() {
  const { settings } = useSettings()
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState('next')
  const timeoutRef = useRef(null)

  const banners = settings?.heroBanners || []

  const startAutoplay = () => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setDirection('next')
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 5000)
  }

  useEffect(() => {
    if (banners.length <= 1) return
    startAutoplay()
    return () => clearTimeout(timeoutRef.current)
  }, [current, banners.length])

  const goTo = (index) => {
    if (index === current) return
    setDirection(index > current ? 'next' : 'prev')
    setCurrent(index)
  }

  const goNext = () => {
    setDirection('next')
    setCurrent((prev) => (prev + 1) % banners.length)
  }

  const goPrev = () => {
    setDirection('prev')
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
  }

  if (banners.length === 0) return null

  return (
    <section className="banner-section" id="home">
      <div className="banner-slider">
        {banners.map((banner, index) => (
          <div
            key={banner.id || index}
            className={`banner-slide ${index === current ? 'active' : ''} ${direction}`}
            style={{ background: banner.bgColor }}
          >
            <div className="banner-container">
              <div className="banner-content">
                <span className="banner-subtitle">{banner.subtitle}</span>
                <h1 className="banner-title">{banner.title}</h1>
                <p className="banner-description">{banner.description}</p>
                <Link to={banner.link} className="banner-cta">
                  {banner.cta}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
              <div className="banner-image-wrapper">
                <img src={banner.image} alt={banner.title} className="banner-image" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="banner-dots">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`banner-dot ${index === current ? 'active' : ''}`}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button className="banner-arrow banner-prev" onClick={goPrev} aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className="banner-arrow banner-next" onClick={goNext} aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </section>
  )
}

export default Hero
