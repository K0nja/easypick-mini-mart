import './OffersSection.css'

const OFFERS = [
  { icon: '🍕', label: 'Fresh Pizza', desc: 'Made fresh daily — slices, whole pies, calzones & more' },
  { icon: '🍺', label: 'Beer & Liquor', desc: 'Wide selection of beer, wine, and spirits' },
  { icon: '🎰', label: 'Lottery', desc: 'Michigan Lottery tickets available' },
  { icon: '🥩', label: 'Specialty Items', desc: 'Kielbasa trays, party pizzas & catering options' },
]

export default function OffersSection() {
  return (
    <section className="offers" id="offers">
      <div className="offers-inner">
        <h2 className="section-heading">Your Neighborhood <span>Mini Mart</span></h2>
        <p className="section-sub">Everything you need, all under one roof in Brownstown, MI</p>
        <div className="offers-grid">
          {OFFERS.map((o) => (
            <div key={o.label} className="offer-card">
              <span className="offer-icon">{o.icon}</span>
              <h3>{o.label}</h3>
              <p>{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
