import { useState, useEffect } from 'react'
import Header from '../components/Header'
import { getMenu, saveMenu, resetMenu, DEFAULT_MENU } from '../data/menuData'
import './Admin.css'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

function formatPrice(price) {
  if (price === null) return ''
  return price.toFixed(2)
}

function ItemEditor({ item, onUpdate, onDelete }) {
  return (
    <div className="item-editor">
      <div className="item-editor-fields">
        <input
          className="field-name"
          value={item.name}
          onChange={(e) => onUpdate({ ...item, name: e.target.value })}
          placeholder="Item name"
        />
        <input
          className="field-desc"
          value={item.description || ''}
          onChange={(e) => onUpdate({ ...item, description: e.target.value })}
          placeholder="Description (optional)"
        />
        <div className="field-price-row">
          <span className="price-symbol">$</span>
          <input
            className="field-price"
            type="number"
            step="0.01"
            min="0"
            value={item.price !== null ? formatPrice(item.price) : ''}
            onChange={(e) => onUpdate({ ...item, price: e.target.value === '' ? null : parseFloat(e.target.value) })}
            placeholder="Price"
          />
          <input
            className="field-note"
            value={item.priceNote || ''}
            onChange={(e) => onUpdate({ ...item, priceNote: e.target.value })}
            placeholder="Note (e.g. +, Coming Soon!)"
          />
        </div>
      </div>
      <button className="btn-delete" onClick={onDelete} title="Remove item">✕</button>
    </div>
  )
}

function SectionEditor({ sectionKey, section, onChange }) {
  function updateItem(index, updated) {
    const items = [...section.items]
    items[index] = updated
    onChange({ ...section, items })
  }

  function deleteItem(index) {
    const items = section.items.filter((_, i) => i !== index)
    onChange({ ...section, items })
  }

  function addItem() {
    const newItem = {
      id: `${sectionKey}_${Date.now()}`,
      name: '',
      description: '',
      price: 0.00,
      priceNote: '',
    }
    onChange({ ...section, items: [...section.items, newItem] })
  }

  return (
    <div className="section-editor">
      <div className="section-editor-header">
        <input
          className="section-title-input"
          value={section.title}
          onChange={(e) => onChange({ ...section, title: e.target.value })}
        />
      </div>
      {section.subtitle !== undefined && (
        <input
          className="section-subtitle-input"
          value={section.subtitle || ''}
          onChange={(e) => onChange({ ...section, subtitle: e.target.value })}
          placeholder="Subtitle"
        />
      )}
      {section.hours !== undefined && (
        <input
          className="section-hours-input"
          value={section.hours || ''}
          onChange={(e) => onChange({ ...section, hours: e.target.value })}
          placeholder="Hours"
        />
      )}
      <div className="section-items">
        {section.items.map((item, index) => (
          <ItemEditor
            key={item.id}
            item={item}
            onUpdate={(updated) => updateItem(index, updated)}
            onDelete={() => deleteItem(index)}
          />
        ))}
      </div>
      <button className="btn-add" onClick={addItem}>+ Add Item</button>
    </div>
  )
}

function ToppingsEditor({ toppings, crusts, onToppingsChange, onCrustsChange }) {
  function updateTopping(index, value) {
    const items = [...toppings.items]
    items[index] = value
    onToppingsChange({ ...toppings, items })
  }

  function addTopping() {
    onToppingsChange({ ...toppings, items: [...toppings.items, ''] })
  }

  function removeTopping(index) {
    onToppingsChange({ ...toppings, items: toppings.items.filter((_, i) => i !== index) })
  }

  function updateCrust(index, value) {
    const items = [...crusts.items]
    items[index] = value
    onCrustsChange({ ...crusts, items })
  }

  function addCrust() {
    onCrustsChange({ ...crusts, items: [...crusts.items, ''] })
  }

  function removeCrust(index) {
    onCrustsChange({ ...crusts, items: crusts.items.filter((_, i) => i !== index) })
  }

  return (
    <div className="toppings-editor">
      <div className="section-editor">
        <div className="section-editor-header">
          <input className="section-title-input" value={toppings.title}
            onChange={(e) => onToppingsChange({ ...toppings, title: e.target.value })} />
        </div>
        <div className="section-items">
          {toppings.items.map((t, i) => (
            <div key={i} className="topping-row">
              <input value={t} onChange={(e) => updateTopping(i, e.target.value)} placeholder="Topping" />
              <button className="btn-delete" onClick={() => removeTopping(i)}>✕</button>
            </div>
          ))}
        </div>
        <button className="btn-add" onClick={addTopping}>+ Add Topping</button>
        <div className="extras-editor">
          <label>Additional Topping Cost $<input type="number" step="0.01" value={toppings.additionalCost}
            onChange={(e) => onToppingsChange({ ...toppings, additionalCost: parseFloat(e.target.value) })} /></label>
          <label>Extra Cheese $<input type="number" step="0.01" value={toppings.extraCheese}
            onChange={(e) => onToppingsChange({ ...toppings, extraCheese: parseFloat(e.target.value) })} /></label>
          <label>Side of Marinara $<input type="number" step="0.01" value={toppings.sideOfMarinara}
            onChange={(e) => onToppingsChange({ ...toppings, sideOfMarinara: parseFloat(e.target.value) })} /></label>
        </div>
      </div>

      <div className="section-editor">
        <div className="section-editor-header">
          <input className="section-title-input" value={crusts.title}
            onChange={(e) => onCrustsChange({ ...crusts, title: e.target.value })} />
        </div>
        <div className="section-items">
          {crusts.items.map((c, i) => (
            <div key={i} className="topping-row">
              <input value={c} onChange={(e) => updateCrust(i, e.target.value)} placeholder="Crust option" />
              <button className="btn-delete" onClick={() => removeCrust(i)}>✕</button>
            </div>
          ))}
        </div>
        <button className="btn-add" onClick={addCrust}>+ Add Crust Option</button>
      </div>
    </div>
  )
}

function GalleryEditor({ photos, onChange }) {
  const [newUrl, setNewUrl] = useState('')
  const [newCaption, setNewCaption] = useState('')
  const [urlError, setUrlError] = useState('')

  function addPhoto() {
    const url = newUrl.trim()
    if (!url) { setUrlError('Please enter an image URL or path.'); return }
    setUrlError('')
    const photo = { id: `g_${Date.now()}`, url, caption: newCaption.trim() }
    onChange([...photos, photo])
    setNewUrl('')
    setNewCaption('')
  }

  function removePhoto(id) {
    onChange(photos.filter((p) => p.id !== id))
  }

  function movePhoto(index, direction) {
    const updated = [...photos]
    const target = index + direction
    if (target < 0 || target >= updated.length) return
    ;[updated[index], updated[target]] = [updated[target], updated[index]]
    onChange(updated)
  }

  function updateCaption(id, caption) {
    onChange(photos.map((p) => p.id === id ? { ...p, caption } : p))
  }

  return (
    <div className="gallery-editor">
      <div className="gallery-editor-help">
        <strong>How to add photos from social media:</strong>
        <ol>
          <li>Download your best photos from Instagram, Facebook, or TikTok to your computer</li>
          <li>Place them in the <code>public/images/</code> folder in this project</li>
          <li>Enter the path below as <code>/images/your-photo.jpg</code></li>
          <li>Or paste any public image URL directly</li>
        </ol>
      </div>

      <div className="gallery-add-form">
        <h3>Add a Photo</h3>
        <input
          className="gallery-url-input"
          value={newUrl}
          onChange={(e) => { setNewUrl(e.target.value); setUrlError('') }}
          placeholder="/images/photo.jpg  or  https://..."
          onKeyDown={(e) => e.key === 'Enter' && addPhoto()}
        />
        {urlError && <p className="gallery-url-error">{urlError}</p>}
        <input
          className="gallery-caption-input"
          value={newCaption}
          onChange={(e) => setNewCaption(e.target.value)}
          placeholder="Caption (optional)"
          onKeyDown={(e) => e.key === 'Enter' && addPhoto()}
        />
        <button className="btn-save" onClick={addPhoto}>+ Add Photo</button>
      </div>

      {photos.length === 0 ? (
        <p className="gallery-empty-msg">No photos yet. Add some above!</p>
      ) : (
        <div className="gallery-photo-list">
          {photos.map((photo, index) => (
            <div key={photo.id} className="gallery-photo-row">
              <div className="gallery-photo-preview">
                <img src={photo.url} alt={photo.caption || ''} onError={(e) => { e.target.style.opacity = '0.3' }} />
              </div>
              <div className="gallery-photo-meta">
                <p className="gallery-photo-url" title={photo.url}>{photo.url}</p>
                <input
                  value={photo.caption || ''}
                  onChange={(e) => updateCaption(photo.id, e.target.value)}
                  placeholder="Caption"
                  className="gallery-caption-inline"
                />
              </div>
              <div className="gallery-photo-actions">
                <button onClick={() => movePhoto(index, -1)} disabled={index === 0} title="Move up">↑</button>
                <button onClick={() => movePhoto(index, 1)} disabled={index === photos.length - 1} title="Move down">↓</button>
                <button className="btn-delete" onClick={() => removePhoto(photo.id)} title="Remove">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === 'true')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [menu, setMenu] = useState(null)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('pizzas')

  useEffect(() => {
    if (authed) {
      setLoading(true)
      getMenu()
        .then((data) => {
          setMenu(data)
        })
        .catch(() => {
          setMenu(DEFAULT_MENU)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [authed])

  function login(e) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true')
      setAuthed(true)
      setError('')
    } else {
      setError('Incorrect password.')
    }
  }

  function logout() {
    sessionStorage.removeItem('admin_auth')
    setAuthed(false)
    setMenu(null)
  }

  async function handleSave() {
    setSaving(true)
    await saveMenu(menu)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  async function handleReset() {
    if (window.confirm('Reset all menu items to defaults? This cannot be undone.')) {
      const defaultMenu = await resetMenu()
      setMenu(defaultMenu)
    }
  }

  function updateSection(key, updated) {
    setMenu((prev) => ({ ...prev, [key]: updated }))
  }

  const TABS = [
    { key: 'pizzas', label: '14" Pizzas' },
    { key: 'alaCartePizzas', label: 'A La Carte' },
    { key: 'specialty', label: 'Specialty' },
    { key: 'combos', label: 'Combos' },
    { key: 'toppingsAndCrusts', label: 'Toppings & Crusts' },
    { key: 'gallery', label: '📸 Gallery' },
  ]

  if (!authed) {
    return (
      <div className="admin-login-page">
        <div className="login-box">
          <h1>Admin Login</h1>
          <p>Easy Pick Mini Mart</p>
          <form onSubmit={login}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
            />
            {error && <p className="login-error">{error}</p>}
            <button type="submit" className="btn-login">Sign In</button>
          </form>
        </div>
      </div>
    )
  }

  if (loading) return <div className="admin-loading">Loading menu...</div>
  if (!menu) return null

  return (
    <div className="admin-page">
      <Header />

      <main className="admin-container">
        <div className="admin-topbar">
          <h2>Menu Editor</h2>
          <div className="admin-actions">
            <button className="btn-reset" onClick={handleReset}>Reset to Defaults</button>
            <button className="btn-save" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
            </button>
            <button className="btn-logout" onClick={logout}>Log Out</button>
          </div>
        </div>

        <p className="admin-hint">Changes are saved to this browser and reflected on the public menu page.</p>

        <div className="admin-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`tab-btn ${activeTab === tab.key ? 'tab-btn--active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="admin-panel">
          {activeTab === 'toppingsAndCrusts' ? (
            <ToppingsEditor
              toppings={menu.toppings}
              crusts={menu.crusts}
              onToppingsChange={(updated) => updateSection('toppings', updated)}
              onCrustsChange={(updated) => updateSection('crusts', updated)}
            />
          ) : activeTab === 'gallery' ? (
            <GalleryEditor
              photos={menu.gallery || []}
              onChange={(updated) => updateSection('gallery', updated)}
            />
          ) : (
            <SectionEditor
              sectionKey={activeTab}
              section={menu[activeTab]}
              onChange={(updated) => updateSection(activeTab, updated)}
            />
          )}
        </div>

        <div className="admin-bottom-actions">
          <button className="btn-save btn-save--lg" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </main>
    </div>
  )
}
