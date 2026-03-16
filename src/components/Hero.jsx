import './Hero.css'

export default function Hero({ orderCutoff }) {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      <div className="hero-content">
        <p className="hero-eyebrow">Welcome to</p>
        <h1 className="hero-title">Easy Pick<br />Mini Mart</h1>
        <p className="hero-tagline">Liquor · Beer · Lottery · Pizza · and More!</p>
        <div className="hero-cta">
          <a href="#menu" className="hero-btn hero-btn--primary">View Menu</a>
          <a href="tel:7346751340" className="hero-btn hero-btn--secondary">📞 Call Us</a>
        </div>
        <p className="hero-hours">{orderCutoff}</p>
        <p className="hero-address">22764 West Rd · Brownstown MI 48183</p>
      </div>
      <a href="#offers" className="hero-scroll-hint" aria-label="Scroll down">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="28" height="28">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </a>
    </section>
  )
}
