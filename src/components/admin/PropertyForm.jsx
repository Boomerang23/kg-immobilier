import { useEffect, useRef, useState } from 'react'

const inputClass =
  'w-full rounded-sm border border-beige-300 bg-white px-3 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30'

const labelClass = 'mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal-muted'

function ImagePreviewGrid({ items, onRemove, label }) {
  if (!items.length) return null

  return (
    <div className="mt-3">
      <p className="mb-2 text-xs text-charcoal-muted">{label}</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.key} className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-beige-200">
            <img src={item.preview} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onRemove(item.key)}
              className="absolute right-1 top-1 rounded-full bg-charcoal/80 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Supprimer l'image"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PropertyForm({ initial, onSubmit, onCancel, saving }) {
  const [form, setForm] = useState({ ...initial })
  const [featuresText, setFeaturesText] = useState((initial.features ?? []).join(', '))
  const [coverPreview, setCoverPreview] = useState(initial.coverImageUrl || initial.coverImage || '')
  const [galleryPreviews, setGalleryPreviews] = useState([])
  const coverInputRef = useRef(null)
  const galleryInputRef = useRef(null)

  useEffect(() => {
    return () => {
      galleryPreviews.forEach((item) => {
        if (item.file) URL.revokeObjectURL(item.preview)
      })
    }
  }, [galleryPreviews])

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCoverPreview(URL.createObjectURL(file))
    update('coverFile', file)
  }

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files ?? [])
    const newItems = files.map((file) => ({
      key: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }))
    setGalleryPreviews((prev) => [...prev, ...newItems])
  }

  const removeExistingGallery = (id) => {
    update('removedImageIds', [...(form.removedImageIds ?? []), id])
    update(
      'existingGallery',
      (form.existingGallery ?? []).filter((img) => img.id !== id),
    )
  }

  const removeNewGallery = (key) => {
    setGalleryPreviews((prev) => {
      const item = prev.find((p) => p.key === key)
      if (item?.preview) URL.revokeObjectURL(item.preview)
      return prev.filter((p) => p.key !== key)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit({
      ...form,
      features: featuresText
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean),
      galleryFiles: galleryPreviews.map((p) => p.file),
    })
  }

  const visibleExistingGallery = (form.existingGallery ?? []).filter(
    (img) => !(form.removedImageIds ?? []).includes(img.id),
  )

  const requiresCover = !form.id && !form.coverFile

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="title">Titre</label>
          <input id="title" required value={form.title} onChange={(e) => update('title', e.target.value)} className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="price">Prix</label>
          <input id="price" required value={form.price} onChange={(e) => update('price', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="location">Localisation</label>
          <input id="location" required value={form.location} onChange={(e) => update('location', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="type">Type</label>
          <select id="type" value={form.type} onChange={(e) => update('type', e.target.value)} className={inputClass}>
            <option>Appartement</option>
            <option>Villa</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="status">Statut</label>
          <select id="status" value={form.status} onChange={(e) => update('status', e.target.value)} className={inputClass}>
            <option>Location</option>
            <option>Vente</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="bedrooms">Chambres</label>
          <input id="bedrooms" type="number" min="0" required value={form.bedrooms} onChange={(e) => update('bedrooms', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="bathrooms">Salles de bain</label>
          <input id="bathrooms" type="number" min="0" required value={form.bathrooms} onChange={(e) => update('bathrooms', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="parking">Parking</label>
          <input id="parking" type="number" min="0" required value={form.parking} onChange={(e) => update('parking', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="area">Surface (m²)</label>
          <input id="area" type="number" min="0" required value={form.area} onChange={(e) => update('area', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="slug">Slug URL</label>
          <input id="slug" value={form.slug} onChange={(e) => update('slug', e.target.value)} className={inputClass} placeholder="auto-généré depuis le titre" />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Image de couverture {requiresCover && <span className="text-red-500">*</span>}</label>
          <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            className="w-full rounded-sm border border-dashed border-beige-300 bg-beige-50 px-4 py-6 text-sm text-charcoal-muted transition-colors hover:border-gold-400 hover:bg-white"
          >
            {coverPreview ? 'Remplacer la couverture' : 'Téléverser une couverture'}
          </button>
          {coverPreview && (
            <div className="mt-3 aspect-[16/10] overflow-hidden rounded-sm bg-beige-200">
              <img src={coverPreview} alt="Aperçu couverture" className="h-full w-full object-cover" />
            </div>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Galerie photos</label>
          <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryChange} />
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            className="w-full rounded-sm border border-dashed border-beige-300 bg-beige-50 px-4 py-6 text-sm text-charcoal-muted transition-colors hover:border-gold-400 hover:bg-white"
          >
            Ajouter des photos à la galerie
          </button>
          {visibleExistingGallery.length > 0 && (
            <ImagePreviewGrid
              label="Photos existantes"
              items={visibleExistingGallery.map((img) => ({ key: img.id, preview: img.url }))}
              onRemove={removeExistingGallery}
            />
          )}
          <ImagePreviewGrid
            label={galleryPreviews.length ? 'Nouvelles photos' : ''}
            items={galleryPreviews}
            onRemove={removeNewGallery}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="description">Description</label>
          <textarea id="description" required rows={4} value={form.description} onChange={(e) => update('description', e.target.value)} className={`${inputClass} resize-y`} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="features">Équipements (séparés par des virgules)</label>
          <input id="features" value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} className={inputClass} />
        </div>
        <div className="flex flex-wrap gap-4 sm:col-span-2">
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input type="checkbox" checked={form.featured} onChange={(e) => update('featured', e.target.checked)} className="rounded border-beige-300 text-gold-500 focus:ring-gold-400" />
            Coup de cœur
          </label>
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input type="checkbox" checked={form.furnished} onChange={(e) => update('furnished', e.target.checked)} className="rounded border-beige-300 text-gold-500 focus:ring-gold-400" />
            Meublé
          </label>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-beige-200 pt-5 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} disabled={saving} className="rounded-sm border border-beige-300 px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-beige-50 disabled:opacity-60">
          Annuler
        </button>
        <button type="submit" disabled={saving || requiresCover} className="rounded-sm bg-charcoal px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-charcoal-light disabled:opacity-60">
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </form>
  )
}
