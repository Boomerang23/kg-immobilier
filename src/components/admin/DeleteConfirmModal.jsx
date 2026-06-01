export default function DeleteConfirmModal({
  property,
  onConfirm,
  onCancel,
  title = 'Supprimer ce bien ?',
  message,
  confirmLabel = 'Supprimer',
}) {
  if (!property) return null

  const body =
    message ??
    (
      <>
        Vous êtes sur le point de supprimer{' '}
        <span className="font-medium text-charcoal">{property.title}</span>. Cette action est
        irréversible.
      </>
    )

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-title"
    >
      <div className="w-full max-w-md rounded-sm bg-white p-6 shadow-2xl">
        <h3 id="delete-title" className="font-display text-2xl text-charcoal">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">{body}</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-sm border border-beige-300 px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-beige-50"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-sm bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
