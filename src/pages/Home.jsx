import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import OffersSection from '../components/OffersSection'
import Gallery from '../components/Gallery'
import MenuSection from '../components/MenuSection'
import ToppingsSection from '../components/ToppingsSection'
import FollowUs from '../components/FollowUs'
import Footer from '../components/Footer'
import { getMenu } from '../data/menuData'
import './Home.css'

export default function Home() {
  const [menu, setMenu] = useState(null)

  useEffect(() => {
    setMenu(getMenu())
  }, [])

  if (!menu) return null

  return (
    <div className="home">
      <Header />

      <Hero orderCutoff={menu.orderCutoff} />

      <OffersSection />

      {/* Gallery — shows photos added via admin, or a placeholder */}
      <Gallery photos={menu.gallery || []} />

      {/* Full Menu */}
      <section className="menu-section-wrapper" id="menu">
        <div className="menu-section-inner">
          <h2 className="menu-section-title-main">Our Menu</h2>
          <p className="menu-section-note">{menu.menuNote}</p>
          <div className="menu-grid">
            <div className="menu-col">
              <MenuSection section={menu.pizzas} />
              <MenuSection section={menu.specialty} />
              <MenuSection section={menu.combos} />
            </div>
            <div className="menu-col">
              <MenuSection section={menu.alaCartePizzas} variant="ala-carte" />
              <ToppingsSection toppings={menu.toppings} crusts={menu.crusts} />
            </div>
          </div>
        </div>
      </section>

      <FollowUs />

      <Footer />
    </div>
  )
}
