import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStaggerReveal } from '../../hooks/useScrollReveal'
import './Blog.css'

import { API_URL } from '../../config';

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/blogs`)
      .then(r => {
        if (!r.ok) throw new Error('Failed');
        return r.json();
      })
      .then(data => {
        if (Array.isArray(data)) setPosts(data);
      })
      .catch(() => {});
  }, []);

  const [gridRef, gridVisible] = useStaggerReveal(posts.length)
  const [activePost, setActivePost] = useState(null)

  useEffect(() => {
    if (activePost) {
      document.body.style.overflow = 'hidden'
      // Inject SEO meta tags
      const seo = activePost.seo
      if (seo) {
        if (seo.metaTitle) document.title = seo.metaTitle
        const setMeta = (name, content) => {
          if (!content) return
          let el = document.querySelector(`meta[name="${name}"]`)
          if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el) }
          el.content = content
        }
        setMeta('description', seo.metaDescription)
        setMeta('keywords', seo.metaKeywords)
        if (seo.canonicalUrl) {
          let link = document.querySelector('link[rel="canonical"]')
          if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
          link.href = seo.canonicalUrl
        }
      }
    } else {
      document.body.style.overflow = ''
      document.title = 'BetterWash - Premium Natural Skincare'
    }
    return () => { document.body.style.overflow = '' }
  }, [activePost])

  const closeModal = () => setActivePost(null)

  const activeAds = activePost?.productAds || []

  if (posts.length === 0) return null;

  return (
    <section className="blog" id="blog">
      <div className="blog-container">
        <div className="section-header revealed">
          <span className="section-badge">Blog</span>
          <h2 className="section-title">Latest from Our Blog</h2>
          <p className="section-description">
            Tips, guides, and insights on skincare, wellness, and living naturally.
          </p>
        </div>

        <div className={`blog-grid ${gridVisible ? 'revealed' : ''}`} ref={gridRef}>
          {posts.map((post, index) => (
            <article className="blog-card" key={post.id} style={{ '--delay': `${index * 0.15}s` }}>
              <div className="blog-card-image">
                <img src={post.image} alt={post.seo?.imageAlt || post.title} className="blog-card-img" />
                <div className="blog-card-overlay"></div>
              </div>
              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span className="blog-card-category">{post.category}</span>
                  <span className="blog-card-dot">·</span>
                  <span className="blog-card-date">{post.date}</span>
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-footer">
                  <span className="blog-card-read-time">{post.readTime}</span>
                  <div className="blog-card-actions">
                    <button className="blog-card-link" onClick={() => setActivePost(post)}>
                      Read More
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {post.link && (
                      <a href={post.link} target="_blank" rel="noopener noreferrer" className="blog-card-link">
                        Visit Link
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Blog Modal */}
      {activePost && (
        <div className="blog-modal-backdrop" onClick={closeModal}>
          <div className={`blog-modal-wrapper ${activeAds.length > 0 ? 'has-ads' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="blog-modal">
              <button className="blog-modal-close" onClick={closeModal} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>

              <div className="blog-modal-header">
                <img src={activePost.image} alt={activePost.seo?.imageAlt || activePost.title} className="blog-modal-img" />
              </div>

              <div className="blog-modal-body">
                <div className="blog-modal-meta">
                  <span className="blog-card-category">{activePost.category}</span>
                  <span className="blog-card-dot">·</span>
                  <span className="blog-card-date">{activePost.date}</span>
                  <span className="blog-card-dot">·</span>
                  <span className="blog-card-read-time">{activePost.readTime}</span>
                </div>

                <h2 className="blog-modal-title">{activePost.title}</h2>

                <div className="blog-modal-content">
                  {activePost.content.map((paragraph, i) => (
                    <p key={i} dangerouslySetInnerHTML={{
                      __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }} />
                  ))}
                </div>

                {activePost.link && (
                  <a href={activePost.link} target="_blank" rel="noopener noreferrer" className="blog-modal-link-btn">
                    Visit Link
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {activeAds.length > 0 && (
              <aside className="blog-modal-ads">
                <h4 className="blog-modal-ads-title">Recommended Products</h4>
                <div className="blog-modal-ads-list">
                  {activeAds.map((ad, idx) => (
                    <Link to={`/product/${ad.productId}`} className="blog-modal-ad-card" key={idx} onClick={closeModal}>
                      <div className="blog-modal-ad-img-wrap">
                        <img src={ad.image} alt={ad.label} />
                      </div>
                      <div className="blog-modal-ad-info">
                        <span className="blog-modal-ad-label">{ad.label}</span>
                        <span className="blog-modal-ad-cta">Shop Now →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </aside>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Blog
