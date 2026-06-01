import { useState } from 'react'
import { generateTemporaryPassword } from '../../utils/passwordHelpers'

export default function ResetPasswordModal({ admin, onConfirm, onCancel, saving }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  if (!admin) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    onConfirm(password)
  }

  const handleGenerate = () => {
    const generated = generateTemporaryPassword()
    setPassword(generated)
    setConfirmPassword(generated)
    setError('')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-password-title"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-sm bg-white p-6 shadow-2xl"
      >
        <h3 id="reset-password-title" className="font-display text-2xl text-charcoal">
          Réinitialiser le mot de passe
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
          Définissez un mot de passe temporaire pour{' '}
          <span className="font-medium text-charcoal">{admin.full_name || admin.email}</span>.
          Communiquez-le de manière sécurisée (en personne ou appel). L&apos;administrateur pourra
          ensuite le personnaliser dans <strong>Mon compte</strong>.
        </p>

        {error && (
          <p className="mt-4 rounded-sm bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal-muted">
              Nouveau mot de passe temporaire
            </label>
            <input
              type="text"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-beige-300 px-3 py-2.5 text-sm outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal-muted">
              Confirmer
            </label>
            <input
              type="text"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-sm border border-beige-300 px-3 py-2.5 text-sm outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
              autoComplete="new-password"
            />
          </div>
          <button
            type="button"
            onClick={handleGenerate}
            className="text-sm text-gold-600 underline-offset-2 hover:text-gold-700 hover:underline"
          >
            Générer un mot de passe temporaire
          </button>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-sm border border-beige-300 px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-beige-50 disabled:opacity-60"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-sm bg-charcoal px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-charcoal-light disabled:opacity-60"
          >
            {saving ? 'Enregistrement…' : 'Réinitialiser'}
          </button>
        </div>
      </form>
    </div>
  )
}
