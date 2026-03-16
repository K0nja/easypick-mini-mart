import './ToppingsSection.css'

export default function ToppingsSection({ toppings, crusts }) {
  return (
    <div className="toppings-wrapper">
      <div className="toppings-section">
        <h2 className="toppings-title">{toppings.title}</h2>
        <p className="toppings-list">{toppings.items.join(', ')}</p>
        <div className="toppings-extras">
          <span>Additional Toppings......<strong>${toppings.additionalCost.toFixed(2)} each</strong></span>
          <span>Extra Cheese......<strong>${toppings.extraCheese.toFixed(2)}</strong></span>
          <span>Side of Marinara......<strong>${toppings.sideOfMarinara.toFixed(2)}</strong></span>
        </div>
      </div>
      <div className="toppings-section">
        <h2 className="toppings-title">{crusts.title}</h2>
        <p className="toppings-list">{crusts.items.join(' · ')}</p>
      </div>
    </div>
  )
}
