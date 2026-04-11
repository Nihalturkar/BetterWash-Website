import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems } = useCart()
  const location = useLocation()
  
  // Is it home page?
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/betterwashLogo.jpeg" alt="BetterWash" className="logo-img" />
        </Link>

        <button
          className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li>
            {isHome ? <a href="#home" onClick={() => setMenuOpen(false)}>Home</a> : <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>}
          </li>
          <li>
            {isHome ? <a href="#products" onClick={() => setMenuOpen(false)}>Products</a> : <Link to="/#products" onClick={() => setMenuOpen(false)}>Products</Link>}
          </li>
          <li>
            {isHome ? <a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a> : <Link to="/#categories" onClick={() => setMenuOpen(false)}>Categories</Link>}
          </li>
          <li>
            {isHome ? <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a> : <Link to="/#about" onClick={() => setMenuOpen(false)}>About Us</Link>}
          </li>
          <li>
            <Link to="/cart" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {totalItems > 0 && (
                <span style={{ 
                  background: 'var(--primary)', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '20px', 
                  height: '20px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '0.75rem', 
                  fontWeight: 'bold' 
                }}>
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
          <li>
            <a href="https://wa.me/919584251250" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="nav-cta">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
