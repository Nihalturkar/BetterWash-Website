import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead, { getBlogJsonLd, getBreadcrumbJsonLd } from '../../components/SEO/SEOHead';
import { API_URL } from '../../config';
import './BlogDetail.css';

function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_URL}/blogs/${slug}`)
      .then(r => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(data => {
        setBlog(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="blog-detail-container" style={{ paddingTop: '100px' }}>Loading...</div>;
  if (!blog) return <div className="blog-detail-container" style={{ paddingTop: '100px' }}>Blog post not found.</div>;

  const seo = blog.seo || {};

  return (
    <div className="blog-detail-container">
      <SEOHead
        title={seo.metaTitle || `${blog.title} | BetterWash Blog`}
        description={seo.metaDescription || blog.excerpt}
        keywords={seo.metaKeywords || blog.category}
        canonicalUrl={seo.canonicalUrl || `/blog/${blog.slug}`}
        ogType="article"
        ogImage={blog.image}
        jsonLd={getBlogJsonLd(blog)}
      />

      <div className="blog-detail-breadcrumb">
        <Link to="/">Home</Link>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        <Link to="/#blog">Blog</Link>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        <span>{blog.title}</span>
      </div>

      <article className="blog-detail-article">
        <div className="blog-detail-header">
          <div className="blog-detail-meta">
            <span className="blog-detail-category">{blog.category}</span>
            <span className="blog-detail-dot">&middot;</span>
            <span>{blog.date}</span>
            <span className="blog-detail-dot">&middot;</span>
            <span>{blog.readTime}</span>
          </div>
          <h1 className="blog-detail-title">{blog.title}</h1>
          <p className="blog-detail-excerpt">{blog.excerpt}</p>
        </div>

        {blog.image && (
          <div className="blog-detail-image">
            <img src={blog.image} alt={seo.imageAlt || blog.title} />
          </div>
        )}

        <div className="blog-detail-content">
          {(blog.content || []).map((paragraph, i) => (
            <p key={i} dangerouslySetInnerHTML={{
              __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }} />
          ))}
        </div>
      </article>

      {blog.productAds && blog.productAds.length > 0 && (
        <aside className="blog-detail-products">
          <h3>Recommended Products</h3>
          <div className="blog-detail-products-grid">
            {blog.productAds.map((ad, idx) => (
              <Link to={`/product/${ad.productId}`} className="blog-detail-product-card" key={idx}>
                <img src={ad.image} alt={ad.label} />
                <span>{ad.label}</span>
                <span className="blog-detail-product-cta">Shop Now</span>
              </Link>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}

export default BlogDetail;
