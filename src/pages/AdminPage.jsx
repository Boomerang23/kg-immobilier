import { useEffect, useState } from 'react'
import { useProperties } from '../hooks/useProperties'
import { emptyPropertyForm } from '../utils/propertyHelpers'
import AdminLayout from '../components/admin/AdminLayout'
import PropertyForm from '../components/admin/PropertyForm'
import DeleteConfirmModal from '../components/admin/DeleteConfirmModal'
import { PropertyGridSkeleton } from '../components/ui/Skeletons'
import EmptyState from '../components/ui/EmptyState'
import { BRAND } from '../constants'

export default function AdminPage() {
  const { records, upsertProperty, deleteProperty, loading, source, refresh } = useProperties()
  const [view, setView] = useState('list')
  const [editing, setEditing] = useState(null)
  const [toDelete, setToDelete] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = `Administration — ${BRAND.name}`
    return () => {
      document.title = `${BRAND.name} — Agent immobilier à Abidjan`
    }
  }, [])

  const openCreate = () => {
    setEditing(emptyPropertyForm())
    setView('form')
    setError('')
  }

  const openEdit = (record) => {
    setEditing({
      ...emptyPropertyForm(),
      ...record,
      coverImageUrl: record.coverImage ?? record.coverImageUrl,
      existingGallery: record.existingGallery ?? [],
      coverFile: null,
      galleryFiles: [],
      removedImageIds: [],
    })
    setView('form')
    setError('')
  }

  const handleSave = async (form) => {
    setSaving(true)
    setError('')
    try {
      await upsertProperty(form)
      setView('list')
      setEditing(null)
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'enregistrement')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!toDelete) return
    try {
      await deleteProperty(toDelete.id)
    } catch (err) {
      setError(err.message || 'Erreur lors de la suppression')
    } finally {
      setToDelete(null)
    }
  }

  return (
    <AdminLayout>
      {view === 'list' && (
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            onClick={openCreate}
            className="rounded-sm bg-gold-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-600"
          >
            + Ajouter un bien
          </button>
        </div>
      )}

      {error && (
        <p className="mb-6 rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      {view === 'list' ? (
        <>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl text-charcoal">Biens immobiliers</h2>
              <p className="mt-1 text-sm text-charcoal-muted">
                {loading ? 'Chargement…' : `${records.length} bien${records.length > 1 ? 's' : ''}`}
                {source === 'supabase' && ' · Supabase'}
                {source === 'fallback' && ' · Données locales (Supabase non configuré)'}
              </p>
            </div>
            <button
              type="button"
              onClick={refresh}
              className="text-sm text-charcoal-muted underline-offset-2 hover:text-charcoal hover:underline"
            >
              Actualiser
            </button>
          </div>

          {loading ? (
            <PropertyGridSkeleton count={3} />
          ) : records.length === 0 ? (
            <EmptyState
              title="Aucun bien enregistré"
              description="Commencez par ajouter votre premier bien immobilier."
              action={
                <button
                  type="button"
                  onClick={openCreate}
                  className="rounded-sm bg-charcoal px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-charcoal-light"
                >
                  Ajouter un bien
                </button>
              }
            />
          ) : (
            <div className="space-y-4">
              {records.map((record) => (
                <article
                  key={record.id}
                  className="flex flex-col gap-4 rounded-sm border border-beige-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5"
                >
                  <div className="flex min-w-0 flex-1 gap-4">
                    <div className="h-20 w-28 shrink-0 overflow-hidden rounded-sm bg-beige-200">
                      {record.coverImage && (
                        <img
                          src={record.coverImage}
                          alt={record.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-sm bg-charcoal px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white">
                          {record.status}
                        </span>
                        <span className="text-xs text-gold-600">{record.type}</span>
                      </div>
                      <h3 className="mt-1 truncate font-display text-lg text-charcoal">{record.title}</h3>
                      <p className="text-sm text-charcoal-muted">{record.location}</p>
                      <p className="mt-1 text-sm font-medium text-charcoal">{record.price}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(record)}
                      className="flex-1 rounded-sm border border-beige-300 px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-beige-50 sm:flex-none"
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => setToDelete(record)}
                      className="flex-1 rounded-sm border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 sm:flex-none"
                    >
                      Supprimer
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 font-display text-2xl text-charcoal">
            {editing?.id ? 'Modifier le bien' : 'Nouveau bien'}
          </h2>
          <div className="rounded-sm border border-beige-200 bg-white p-5 shadow-sm sm:p-8">
            <PropertyForm
              initial={editing}
              onSubmit={handleSave}
              onCancel={() => {
                setView('list')
                setEditing(null)
              }}
              saving={saving}
            />
          </div>
        </div>
      )}

      <DeleteConfirmModal
        property={toDelete}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </AdminLayout>
  )
}
