import { useSettings } from '../../context/SettingsContext'
import './OfferBar.css'

function OfferBar() {
  const { settings } = useSettings()
  const offers = settings?.offers || []

  if (offers.length === 0) return null

  // Duplicate offers for seamless loop
  const marqueeItems = [...offers, ...offers, ...offers]

  return (
    <div className="offer-bar">
      <div className="offer-marquee">
        <div className="offer-marquee-track">
          {marqueeItems.map((offer, i) => (
            <span className="offer-item" key={i}>
              <span className="offer-dot"></span>
              {offer}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OfferBar
