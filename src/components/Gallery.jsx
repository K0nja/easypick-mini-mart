import { useState } from 'react'
import './Gallery.css'

export default function Gallery({ photos }) {
  const [lightbox, setLightbox] = useState(null)

  if (!photos || photos.length === 0) {
    return (
      <section className="gallery" id="gallery">
        <div className="gallery-inner">
          <h2 className="section-heading-dark">From Our Store</h2>
          <p className="section-sub-dark">Follow us <strong>@easypickminimart</strong> for the latest!</p>
          <div className="gallery-empty">
            <p>📸 Photos coming soon — follow us on social media!</p>
            <div className="gallery-social-links">
              <a href="https://www.instagram.com/easypickmini?igsh=aHh4dHQ2cjYzZ3l5&utm_source=ig_contact_invite" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/share/1E3TuwpuLn/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.tiktok.com/@easypickminimart?_r=1&_t=ZP-94iSybbMot5" target="_blank" rel="noopener noreferrer">TikTok</a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="gallery" id="gallery">
      <div className="gallery-inner">
        <h2 className="section-heading-dark">From Our Store</h2>
        <p className="section-sub-dark">Follow us <strong>@easypickminimart</strong> for the latest</p>
        <div className="gallery-grid">
          {photos.map((photo) => (
            <button
              key={photo.id}
              className="gallery-item"
              onClick={() => setLightbox(photo)}
              aria-label={photo.caption || 'Photo'}
            >
              <img src={photo.url} alt={photo.caption || ''} loading="lazy" />
              {photo.caption && <span className="gallery-caption">{photo.caption}</span>}
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.url} alt={lightbox.caption || ''} />
            {lightbox.caption && <p className="lightbox-caption">{lightbox.caption}</p>}
          </div>
        </div>
      )}
    </section>
  )
}
