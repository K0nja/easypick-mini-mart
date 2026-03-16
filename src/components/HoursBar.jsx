import './HoursBar.css'

export default function HoursBar({ orderCutoff }) {
  return (
    <div className="hours-bar">
      <p>{orderCutoff}</p>
    </div>
  )
}
