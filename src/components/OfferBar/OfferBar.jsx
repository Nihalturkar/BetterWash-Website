import { useState, useEffect } from 'react'
import './OfferBar.css'

const offers = [
  '🎉 5% Extra Off on Prepaid Orders | Free Delivery on ₹299+',
  '🔥 Flat 30% Off on All Shampoos — Use Code: WASH30',
  '✨ Buy 2 Get 1 Free on Body Wash Range',
  '🌿 New Launch: Herbal Face Pack — Introductory Price ₹199',
]

function OfferBar() {
  const [currentOffer, setCurrentOffer] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="offer-bar">
      <div className="offer-bar-content">
        <span className="offer-text" key={currentOffer}>
          {offers[currentOffer]}
        </span>
      </div>
    </div>
  )
}

export default OfferBar
