import { useState, useEffect } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './Footer.css'

function Footer() {
  const [footerRef, footerVisible] = useScrollReveal({ threshold: 0.1 })
  const [activeModal, setActiveModal] = useState(null)

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
        <div className="footer-grid">
          <div className="footer-brand footer-col">
            <div className="footer-logo">
              <img src="/betterwashLogo.jpeg" alt="BetterWash" className="footer-logo-img" />
            </div>
            <p className="footer-description">
              Premium skincare and hygiene products crafted with natural ingredients.
              Your trusted partner for daily care.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
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
              <p>Last updated: April 2025</p>
            </div>

            <div className="footer-modal-body">
              <h3>1. Information We Collect</h3>
              <p>At BetterWash, we value your privacy. When you interact with our website or purchase our products, we may collect the following information:</p>
              <ul>
                <li><strong>Personal Information:</strong> Name, email address, phone number, and shipping address provided during orders or inquiries.</li>
                <li><strong>Usage Data:</strong> Information about how you browse our website, including pages visited, time spent, and device information.</li>
                <li><strong>Communication Data:</strong> Messages sent via WhatsApp, email, or contact forms.</li>
              </ul>

              <h3>2. How We Use Your Information</h3>
              <p>We use the collected information for the following purposes:</p>
              <ul>
                <li>Processing and fulfilling your product orders.</li>
                <li>Responding to your inquiries and providing customer support.</li>
                <li>Sending order updates and delivery notifications.</li>
                <li>Improving our website experience and product offerings.</li>
                <li>Sending promotional offers and newsletters (only with your consent).</li>
              </ul>

              <h3>3. Data Protection</h3>
              <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and is only accessible to authorized personnel.</p>

              <h3>4. Third-Party Sharing</h3>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your data only with:</p>
              <ul>
                <li>Delivery partners for order fulfillment.</li>
                <li>Payment processors for secure transactions.</li>
                <li>Legal authorities when required by law.</li>
              </ul>

              <h3>5. Cookies</h3>
              <p>Our website may use cookies to enhance your browsing experience. Cookies help us understand user preferences and improve our services. You can disable cookies through your browser settings at any time.</p>

              <h3>6. Your Rights</h3>
              <p>You have the right to:</p>
              <ul>
                <li>Access the personal data we hold about you.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of your personal data.</li>
                <li>Opt out of promotional communications at any time.</li>
              </ul>

              <h3>7. Contact Us</h3>
              <p>If you have any questions about our Privacy Policy, please contact us:</p>
              <ul>
                <li>Email: <a href="mailto:deepanshg31@gmail.com">deepanshg31@gmail.com</a></li>
                <li>Phone: <a href="tel:+919584251250">+91 95842 51250</a></li>
                <li>Address: Bhopal, Madhya Pradesh, India</li>
              </ul>
            </div>
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
              <p>Last updated: April 2025</p>
            </div>

            <div className="footer-modal-body">
              <h3>1. Acceptance of Terms</h3>
              <p>By accessing and using the BetterWash website and purchasing our products, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.</p>

              <h3>2. Products & Services</h3>
              <p>BetterWash offers premium skincare, hair care, and hygiene products made with natural ingredients. All product descriptions, images, and prices are presented as accurately as possible. We reserve the right to modify product availability and pricing without prior notice.</p>

              <h3>3. Orders & Payments</h3>
              <ul>
                <li>All orders are subject to product availability and confirmation.</li>
                <li>Prices are listed in Indian Rupees (INR) and include applicable taxes unless stated otherwise.</li>
                <li>We accept payments through secure online payment methods and cash on delivery where available.</li>
                <li>Once an order is confirmed, you will receive a confirmation via WhatsApp or email.</li>
              </ul>

              <h3>4. Shipping & Delivery</h3>
              <ul>
                <li>We aim to deliver products within the estimated delivery timeframe provided at checkout.</li>
                <li>Delivery times may vary depending on your location and product availability.</li>
                <li>BetterWash is not responsible for delays caused by courier services or unforeseen circumstances.</li>
              </ul>

              <h3>5. Returns & Refunds</h3>
              <ul>
                <li>Products can be returned within 7 days of delivery if they are unused, unopened, and in original packaging.</li>
                <li>Damaged or defective products will be replaced free of charge upon verification.</li>
                <li>Refunds will be processed within 7-10 business days after the returned product is received and inspected.</li>
                <li>Shipping charges for returns are borne by the customer unless the product is defective.</li>
              </ul>

              <h3>6. Intellectual Property</h3>
              <p>All content on this website, including text, images, logos, graphics, and design, is the property of BetterWash and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content without our written permission.</p>

              <h3>7. User Conduct</h3>
              <p>When using our website, you agree not to:</p>
              <ul>
                <li>Provide false or misleading information.</li>
                <li>Interfere with the website's functionality or security.</li>
                <li>Use the website for any unlawful purpose.</li>
                <li>Attempt to gain unauthorized access to our systems.</li>
              </ul>

              <h3>8. Limitation of Liability</h3>
              <p>BetterWash shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our liability is limited to the purchase price of the product in question.</p>

              <h3>9. Changes to Terms</h3>
              <p>We reserve the right to update these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Continued use of our services after changes constitutes acceptance of the revised terms.</p>

              <h3>10. Contact Us</h3>
              <p>For any questions regarding these Terms of Service, please reach out to us:</p>
              <ul>
                <li>Email: <a href="mailto:deepanshg31@gmail.com">deepanshg31@gmail.com</a></li>
                <li>Phone: <a href="tel:+919584251250">+91 95842 51250</a></li>
                <li>Address: Bhopal, Madhya Pradesh, India</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer
