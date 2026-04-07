import { useState, useEffect } from 'react'
import { useScrollReveal, useStaggerReveal } from '../../hooks/useScrollReveal'
import './Blog.css'

const posts = [
  {
    id: 1,
    title: '5 Natural Ingredients That Transform Your Skin',
    excerpt: 'Discover the power of nature with these five ingredients that dermatologists swear by for healthier, glowing skin every day.',
    date: 'Mar 28, 2025',
    readTime: '5 min read',
    category: 'Skin Care',
    emoji: '🌿',
    gradient: 'linear-gradient(135deg, #b8860b, #d4a017)',
    content: [
      'Nature has always been the best healer, and when it comes to skincare, natural ingredients outperform synthetic ones every time. Here are five powerhouse ingredients that can truly transform your skin.',
      '**1. Aloe Vera** — Known as the "plant of immortality," aloe vera deeply hydrates, soothes inflammation, and accelerates wound healing. It\'s rich in vitamins A, C, and E, making it a perfect all-rounder for daily skincare.',
      '**2. Turmeric** — This golden spice contains curcumin, a powerful antioxidant and anti-inflammatory compound. Regular use helps brighten skin tone, reduce dark spots, and fight acne-causing bacteria.',
      '**3. Tea Tree Oil** — A natural antiseptic that effectively combats acne, reduces redness, and controls excess oil production. Just a few drops mixed with your moisturizer can work wonders.',
      '**4. Shea Butter** — Extracted from the African shea tree, this rich butter is packed with fatty acids and vitamins. It provides intense moisture without clogging pores, making it ideal for dry and sensitive skin.',
      '**5. Neem Extract** — Neem has been used in Ayurvedic medicine for centuries. Its antibacterial, antifungal, and anti-inflammatory properties make it excellent for treating acne, eczema, and other skin conditions.',
      'At BetterWash, we carefully blend these natural ingredients into our products to give you the best of nature and science combined.',
    ],
  },
  {
    id: 2,
    title: 'The Ultimate Hair Care Routine for Every Season',
    excerpt: 'From monsoon frizz to winter dryness — learn how to adapt your hair care routine throughout the year with BetterWash products.',
    date: 'Mar 15, 2025',
    readTime: '4 min read',
    category: 'Hair Care',
    emoji: '💆',
    gradient: 'linear-gradient(135deg, #d4a017, #e8c547)',
    content: [
      'Your hair goes through a lot with changing seasons. What works in summer might not be enough in winter. Here\'s how to keep your hair healthy all year round.',
      '**Summer (April–June):** Heat and UV rays can dry out your hair. Use a lightweight, hydrating shampoo and always apply a leave-in conditioner with UV protection. Wash your hair more frequently to remove sweat and oil buildup.',
      '**Monsoon (July–September):** Humidity causes frizz and fungal infections on the scalp. Switch to an anti-fungal herbal shampoo, avoid tying wet hair, and use a wide-tooth comb to prevent breakage. Our Herbal Shampoo with neem extracts is perfect for this season.',
      '**Autumn (October–November):** This is recovery time. Deep condition your hair weekly, trim split ends, and reduce heat styling. A protein-rich hair mask once a week will restore strength and shine.',
      '**Winter (December–March):** Cold, dry air strips moisture from your hair. Use a rich, nourishing shampoo and follow up with a thick conditioner. Oil massages with coconut or argan oil twice a week can prevent dryness and static.',
      'The key is to listen to your hair and adjust your routine accordingly. With BetterWash products, you have natural, season-friendly options for every hair type.',
    ],
  },
  {
    id: 3,
    title: 'Why Paraben-Free Products Matter for Your Health',
    excerpt: 'Understanding the science behind paraben-free skincare and why making the switch is one of the best decisions for your body.',
    date: 'Mar 5, 2025',
    readTime: '6 min read',
    category: 'Wellness',
    emoji: '🧪',
    gradient: 'linear-gradient(135deg, #e8c547, #b8860b)',
    content: [
      'Parabens have been widely used as preservatives in cosmetics and personal care products since the 1950s. But growing scientific evidence suggests they may not be as harmless as once thought.',
      '**What are parabens?** Parabens (methylparaben, propylparaben, butylparaben) are synthetic chemicals that prevent the growth of bacteria and mold in products. They\'re found in shampoos, moisturizers, shaving gels, and even makeup.',
      '**The health concerns:** Studies have shown that parabens can mimic estrogen in the body, potentially disrupting the endocrine system. They\'ve been detected in breast tissue samples, raising questions about their long-term safety. While no direct causal link to cancer has been proven, the precautionary principle suggests avoiding them when possible.',
      '**Skin irritation:** Beyond hormonal concerns, parabens can cause skin irritation, allergic reactions, and contact dermatitis — especially for those with sensitive skin. If you\'ve ever experienced unexplained redness or itching from a product, parabens might be the culprit.',
      '**Natural alternatives work:** Modern preservation techniques using natural ingredients like rosemary extract, vitamin E, and grapefruit seed extract are just as effective at keeping products fresh. BetterWash uses these natural preservatives in all our formulations.',
      '**Making the switch:** Check your product labels — if you see any ingredient ending in "-paraben," consider switching to a cleaner alternative. Your skin absorbs up to 60% of what you put on it, so choosing paraben-free products is an investment in your long-term health.',
      'At BetterWash, every single product is 100% paraben-free. We believe you shouldn\'t have to compromise between effective skincare and your health.',
    ],
  },
]

function Blog() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [gridRef, gridVisible] = useStaggerReveal(posts.length)
  const [activePost, setActivePost] = useState(null)

  useEffect(() => {
    if (activePost) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [activePost])

  const closeModal = () => setActivePost(null)

  return (
    <section className="blog" id="blog">
      <div className="blog-container">
        <div className={`section-header ${headerVisible ? 'revealed' : ''}`} ref={headerRef}>
          <span className="section-badge">Blog</span>
          <h2 className="section-title">Latest from Our Blog</h2>
          <p className="section-description">
            Tips, guides, and insights on skincare, wellness, and living naturally.
          </p>
        </div>

        <div className={`blog-grid ${gridVisible ? 'revealed' : ''}`} ref={gridRef}>
          {posts.map((post, index) => (
            <article className="blog-card" key={post.id} style={{ '--delay': `${index * 0.15}s` }}>
              <div className="blog-card-image" style={{ background: post.gradient }}>
                <span className="blog-card-emoji">{post.emoji}</span>
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
                  <button className="blog-card-link" onClick={() => setActivePost(post)}>
                    Read More
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Blog Modal */}
      {activePost && (
        <div className="blog-modal-backdrop" onClick={closeModal}>
          <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
            <button className="blog-modal-close" onClick={closeModal} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div className="blog-modal-header" style={{ background: activePost.gradient }}>
              <span className="blog-modal-emoji">{activePost.emoji}</span>
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
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Blog
