import { useState, useEffect } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useSettings } from '../../context/SettingsContext'
import './Footer.css'

import { API_URL } from '../../config';

function Footer() {
  const { settings } = useSettings()
  const [footerRef, footerVisible] = useScrollReveal({ threshold: 0.1 })
  const [activeModal, setActiveModal] = useState(null)
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [contactStatus, setContactStatus] = useState(null)
  const [contactSending, setContactSending] = useState(false)

  const handleContactChange = (e) => {
    setContactForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSending(true);
    setContactStatus(null);
    try {
      const res = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      if (res.ok) {
        setContactStatus('success');
        setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setContactStatus('error');
      }
    } catch {
      setContactStatus('error');
    } finally {
      setContactSending(false);
    }
  };

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [activeModal])

  const closeModal = () => setActiveModal(null)

  return (
    <footer className={`footer ${footerVisible ? 'revealed' : ''}`} id="contact" ref={footerRef}>
      <div className="footer-glow"></div>
      <div className="footer-container">
        {/* Contact Form Section */}
        <div className="footer-contact-section">
          <div className="footer-contact-info">
            <h3 className="footer-contact-title">Get In Touch</h3>
            <p className="footer-contact-desc">
              Have a question or need help? Send us a message and we'll get back to you as soon as possible.
            </p>
            <ul className="footer-links footer-contact">
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:deepanshg31@gmail.com">deepanshg31@gmail.com</a>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href="tel:+919584251250">+91 95842 51250</a>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Bhopal, Madhya Pradesh, India</span>
              </li>
            </ul>
          </div>
          <form className="footer-contact-form" onSubmit={handleContactSubmit}>
            <div className="footer-form-row">
              <input type="text" name="name" placeholder="Your Name" value={contactForm.name} onChange={handleContactChange} required />
              <input type="email" name="email" placeholder="Email Address" value={contactForm.email} onChange={handleContactChange} required />
            </div>
            <div className="footer-form-row">
              <input type="tel" name="phone" placeholder="Phone Number" value={contactForm.phone} onChange={handleContactChange} />
              <input type="text" name="subject" placeholder="Subject" value={contactForm.subject} onChange={handleContactChange} required />
            </div>
            <textarea name="message" placeholder="Your Message..." rows="4" value={contactForm.message} onChange={handleContactChange} required></textarea>
            {contactStatus === 'success' && <p className="footer-form-success">Message sent successfully! We'll get back to you soon.</p>}
            {contactStatus === 'error' && <p className="footer-form-error">Failed to send message. Please try again.</p>}
            <button type="submit" className="footer-form-btn" disabled={contactSending}>
              {contactSending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="footer-grid">
          <div className="footer-brand footer-col">
            <div className="footer-logo">
              <img src={settings?.logo || '/betterwashLogo.jpeg'} alt={settings?.siteName || 'BetterWash'} className="footer-logo-img" />
            </div>
            <p className="footer-description">
              Premium skincare and hygiene products crafted with natural ingredients.
              Your trusted partner for daily care.
            </p>
            <div className="footer-social">
              {settings?.socialLinks?.instagram && (
                <a href={settings.socialLinks.instagram} className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              )}
              {settings?.socialLinks?.facebook && (
                <a href={settings.socialLinks.facebook} className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              )}
              {settings?.socialLinks?.twitter && (
                <a href={settings.socialLinks.twitter} className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                  </svg>
                </a>
              )}
              {settings?.socialLinks?.youtube && (
                <a href={settings.socialLinks.youtube} className="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div className="footer-links-group footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#reviews">Reviews</a></li>
            </ul>
          </div>

          <div className="footer-links-group footer-col">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li><a href="#">Shampoo</a></li>
              <li><a href="#">Body Wash</a></li>
              <li><a href="#">Moisturizer</a></li>
              <li><a href="#">Face Cleanser</a></li>
              <li><a href="#">Herbal Products</a></li>
            </ul>
          </div>

          <div className="footer-links-group footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-links footer-contact">
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:deepanshg31@gmail.com">deepanshg31@gmail.com</a>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href="tel:+919584251250">+91 95842 51250</a>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Bhopal, Madhya Pradesh, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BetterWash. All rights reserved.</p>
          <div className="footer-bottom-links">
            <button onClick={() => setActiveModal('privacy')}>Privacy Policy</button>
            <button onClick={() => setActiveModal('terms')}>Terms of Service</button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {activeModal === 'privacy' && (
        <div className="footer-modal-backdrop" onClick={closeModal}>
          <div className="footer-modal" onClick={(e) => e.stopPropagation()}>
            <button className="footer-modal-close" onClick={closeModal} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="footer-modal-header">
              <h2>Privacy Policy</h2>
              <p>Last updated: May 2025</p>
            </div>
            <div className="footer-modal-body" dangerouslySetInnerHTML={{ __html: settings?.privacyPolicy || '<p>Privacy Policy content not available.</p>' }} />
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {activeModal === 'terms' && (
        <div className="footer-modal-backdrop" onClick={closeModal}>
          <div className="footer-modal" onClick={(e) => e.stopPropagation()}>
            <button className="footer-modal-close" onClick={closeModal} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div className="footer-modal-header">
              <h2>Terms of Service</h2>
            </div>
            <div className="footer-modal-body" dangerouslySetInnerHTML={{ __html: settings?.termsOfService || '<p>Terms of Service content not available.</p>' }} />
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer
