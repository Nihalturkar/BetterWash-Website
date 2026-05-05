import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const banners = [
  {
    id: 1,
    title: 'Herbal Hair Care',
    subtitle: 'Nourish Your Hair Naturally',
    description: 'Premium shampoos & conditioners with pure herbal extracts for silky, healthy hair.',
    cta: 'Shop Hair Care',
    link: '/category/Shampoo',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80',
    bgColor: '#e8f5f5',
  },
  {
    id: 2,
    title: 'Glow Up Your Skin',
    subtitle: 'Face Care Essentials',
    description: 'Vitamin C cleansers, neem face packs & more for a radiant, clear complexion.',
    cta: 'Shop Face Care',
    link: '/category/Face Cleanser',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
    bgColor: '#fef5f0',
  },
  {
    id: 3,
    title: 'Body Care Collection',
    subtitle: 'Refresh & Rejuvenate',
    description: 'Luxurious body washes, scrubs & lotions for soft, moisturized skin all day.',
    cta: 'Shop Body Care',
    link: '/category/Body Wash',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee0c8d?w=600&q=80',
    bgColor: '#f0f7f4',
  },
  {
    id: 4,
    title: 'Deep Moisturization',
    subtitle: '24-Hour Hydration',
    description: 'Hyaluronic acid & shea butter formulas that keep your skin plump and hydrated.',
    cta: 'Shop Moisturizers',
    link: '/category/Moisturizer',
    image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&q=80',
    bgColor: '#f5f0fe',
  },
]

function Hero() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % banners.length)
        setIsAnimating(false)
      }, 300)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goTo = (index) => {
    if (index === current) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setIsAnimating(false)
    }, 300)
  }

  const banner = banners[current]

  return (
    <section className="banner-section" id="home">
      <div
        className={`banner-slide ${isAnimating ? 'banner-exit' : 'banner-enter'}`}
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

      <button className="banner-arrow banner-prev" onClick={() => goTo((current - 1 + banners.length) % banners.length)} aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className="banner-arrow banner-next" onClick={() => goTo((current + 1) % banners.length)} aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </section>
  )
}

export default Hero
