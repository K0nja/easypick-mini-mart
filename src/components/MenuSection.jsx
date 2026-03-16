import './MenuSection.css'

function formatPrice(price, priceNote) {
  if (price === null) return priceNote || ''
  const formatted = `$${price.toFixed(2)}`
  return priceNote ? `${formatted}${priceNote}` : formatted
}

export default function MenuSection({ section, variant = 'default' }) {
  return (
    <div className={`menu-section menu-section--${variant}`}>
      <h2 className="menu-section-title">{section.title}</h2>
      {section.subtitle && <p className="menu-section-subtitle">{section.subtitle}</p>}
      {section.hours && <p className="menu-section-hours">{section.hours}</p>}
      <div className="menu-items">
        {section.items.map((item) => (
          <div key={item.id} className="menu-item">
            <div className="menu-item-left">
              <span className="menu-item-name">{item.name}</span>
              {item.description && (
                <span className="menu-item-desc">{item.description}</span>
              )}
            </div>
            <span className="menu-item-price">
              {formatPrice(item.price, item.priceNote)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
