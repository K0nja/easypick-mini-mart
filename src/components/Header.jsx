import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'
  const isHome = location.pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  if (isAdmin) {
    return (
      <header className="header header--solid">
        <div className="header-inner">
          <Link to="/" className="header-brand">Easy Pick Mini Mart</Link>
          <Link to="/" className="nav-link">← Back to Site</Link>
        </div>
      </header>
    )
  }

  return (
    <header className={`header header--home ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header-inner">
        <a href="#home" className="header-brand">Easy Pick Mini Mart</a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="#menu" className="nav-link" onClick={() => setMenuOpen(false)}>Menu</a>
          <a href="#gallery" className="nav-link" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="tel:7346751340" className="nav-link nav-link--call">📞 Call</a>
        </nav>
        <button
          className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
      {menuOpen && (
        <nav className="mobile-nav">
          <a href="#menu" onClick={() => setMenuOpen(false)}>Menu</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="tel:7346751340" onClick={() => setMenuOpen(false)}>📞 734-675-1340</a>
        </nav>
      )}
    </header>
  )
}
