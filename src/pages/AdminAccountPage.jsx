import { useEffect, useState } from 'react'
import AdminLayout from '../components/admin/AdminLayout'
import { useAuth } from '../hooks/useAuth'
import { BRAND } from '../constants'
import { changeOwnPassword } from '../services/adminService'
import { validatePasswordPair } from '../utils/passwordHelpers'

export default function AdminAccountPage() {
  const { user } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    document.title = `Mon compte — ${BRAND.name}`
    return () => {
      document.title = `${BRAND.name} — Agent immobilier à Abidjan`
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const validationError = validatePasswordPair(newPassword, confirmPassword)
    if (validationError) {
      setError(validationError)
      return
    }

    if (currentPassword === newPassword) {
      setError('Le nouveau mot de passe doit être différent de l\'actuel.')
      return
    }

    setSaving(true)
    try {
      await changeOwnPassword({
        email: user.email,
        currentPassword,
        newPassword,
      })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setSuccess('Votre mot de passe a été mis à jour avec succès.')
    } catch (err) {
      setError(err.message || 'Impossible de modifier le mot de passe')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout
      title="Mon compte"
      subtitle="Modifiez votre mot de passe de connexion."
    >
      <div className="mx-auto max-w-lg space-y-6">
        {error && (
          <p className="rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}
        {success && (
          <p className="rounded-sm bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{success}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-sm border border-beige-200 bg-white p-5 shadow-sm sm:p-8"
        >
          <p className="mb-6 text-sm text-charcoal-muted">
            Compte : <span className="font-medium text-charcoal">{user?.email}</span>
          </p>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal-muted">
                Mot de passe actuel *
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-sm border border-beige-300 px-3 py-2.5 text-sm outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
                autoComplete="current-password"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal-muted">
                Nouveau mot de passe *
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-sm border border-beige-300 px-3 py-2.5 text-sm outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal-muted">
                Confirmer le nouveau mot de passe *
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-sm border border-beige-300 px-3 py-2.5 text-sm outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
                autoComplete="new-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-6 w-full rounded-sm bg-charcoal py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal-light disabled:opacity-60 sm:w-auto sm:px-8"
          >
            {saving ? 'Enregistrement…' : 'Mettre à jour mon mot de passe'}
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}
