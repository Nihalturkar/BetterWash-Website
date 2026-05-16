import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useSettings } from '../../context/SettingsContext'
import { BASE_URL } from '../../config'
import './TrendingProducts.css'

function getYouTubeId(url) {
  if (!url) return null
  const patterns = [
    /youtube\.com\/shorts\/([^?&/]+)/,
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?&/]+)/,
    /youtube\.com\/embed\/([^?&/]+)/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return m[1]
  }
  return null
}

function getDirectUrl(url) {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${BASE_URL}${url}`
}

function TrendingProducts() {
  const { settings } = useSettings()
  const [headerRef, headerVisible] = useScrollReveal()
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRef = useRef(null)

  const videoAds = settings?.videoAds || []

  // Auto-rotate ads every 10 seconds (only if multiple)
  useEffect(() => {
    if (videoAds.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % videoAds.length)
    }, 10000)
    return () => clearInterval(timer)
  }, [videoAds.length])

  // Restart video when ad changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    }
  }, [currentIndex])

  if (videoAds.length === 0) return null

  const ad = videoAds[currentIndex]
  const ytId = getYouTubeId(ad.videoUrl)

  return (
    <section className="trending-section">
      <div className={`trending-header ${headerVisible ? 'revealed' : ''}`} ref={headerRef}>
        <span className="section-badge">Trending Now</span>
        <h2 className="section-title">Popular Products</h2>
      </div>

      <div className="trending-ad-container">
        <div className="trending-ad-video">
          {ytId ? (
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
              title={ad.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="trending-ad-iframe"
            />
          ) : (
            <video
              ref={videoRef}
              src={getDirectUrl(ad.videoUrl)}
              muted
              autoPlay
              loop
              playsInline
              className="trending-ad-video-el"
            />
          )}
        </div>

        <div className="trending-ad-overlay">
          <h3 className="trending-ad-title">{ad.title}</h3>
          {ad.productId && (
            <Link to={`/product/${ad.productId}`} className="trending-ad-btn">
              View Product
            </Link>
          )}
        </div>

        {videoAds.length > 1 && (
          <div className="trending-ad-dots">
            {videoAds.map((_, i) => (
              <button
                key={i}
                className={`trending-dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default TrendingProducts
