import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useSettings } from '../../context/SettingsContext'
import './About.css'

function About() {
  const { settings } = useSettings()
  const [leftRef, leftVisible] = useScrollReveal()
  const [rightRef, rightVisible] = useScrollReveal()

  const about = settings?.aboutUs
  if (!about) return null

  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className={`about-visual ${leftVisible ? 'revealed' : ''}`} ref={leftRef}>
          <div className="about-card-stack">
            {about.stats.map((stat, i) => (
              <div className="about-stat-card" key={i}>
                <div className={`about-stat-icon-wrap about-stat-icon-${i + 1}`}>
                  <span className="about-stat-icon">{stat.icon}</span>
                </div>
                <div>
                  <span className="about-stat-num">{stat.value}</span>
                  <span className="about-stat-text">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`about-content ${rightVisible ? 'revealed' : ''}`} ref={rightRef}>
          <span className="section-badge">{about.badge}</span>
          <h2 className="section-title about-title">{about.title}</h2>
          {about.paragraphs.map((p, i) => (
            <p className="about-text" key={i}>{p}</p>
          ))}
          <div className="about-features">
            {about.features.map((f, i) => (
              <div className="about-feature" key={i}>
                <span className="feature-check">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
          <a href="#products" className="btn btn-primary">
            <span>Explore Products</span>
            <span className="btn-shine"></span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default About
