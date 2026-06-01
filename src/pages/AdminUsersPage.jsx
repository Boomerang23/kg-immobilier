import { useCallback, useEffect, useState } from 'react'
import AdminLayout from '../components/admin/AdminLayout'
import DeleteConfirmModal from '../components/admin/DeleteConfirmModal'
import ResetPasswordModal from '../components/admin/ResetPasswordModal'
import { useAuth } from '../hooks/useAuth'
import { BRAND } from '../constants'
import { ADMIN_ROLES, ADMIN_ROLE_LABELS } from '../constants/adminRoles'
import {
  listAdminProfiles,
  createAdminUser,
  updateAdminRole,
  deleteAdminProfile,
  resetAdminPasswordBySuperAdmin,
} from '../services/adminService'

export default function AdminUsersPage() {
  const { user } = useAuth()
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [creating, setCreating] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [toDelete, setToDelete] = useState(null)
  const [toResetPassword, setToResetPassword] = useState(null)
  const [resettingPassword, setResettingPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', fullName: '' })
  const [roleUpdatingId, setRoleUpdatingId] = useState(null)

  const loadAdmins = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await listAdminProfiles()
      setAdmins(data)
    } catch (err) {
      setError(err.message || 'Impossible de charger les administrateurs')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    document.title = `Administrateurs — ${BRAND.name}`
    return () => {
      document.title = `${BRAND.name} — Agent immobilier à Abidjan`
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')
      try {
        const data = await listAdminProfiles()
        if (!cancelled) setAdmins(data)
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Impossible de charger les administrateurs')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const superAdminCount = admins.filter((a) => a.role === ADMIN_ROLES.SUPER_ADMIN).length

  const handleCreate = async (e) => {
    e.preventDefault()
    setCreating(true)
    setError('')
    setSuccess('')

    try {
      await createAdminUser({
        email: form.email,
        password: form.password,
        fullName: form.fullName,
      })
      setForm({ email: '', password: '', fullName: '' })
      setShowForm(false)
      setSuccess('Compte administrateur créé avec succès.')
      await loadAdmins()
    } catch (err) {
      setError(err.message || 'Erreur lors de la création du compte')
    } finally {
      setCreating(false)
    }
  }

  const handleRoleChange = async (adminId, newRole) => {
    setRoleUpdatingId(adminId)
    setError('')
    setSuccess('')

    try {
      await updateAdminRole(adminId, newRole)
      setSuccess('Rôle mis à jour.')
      await loadAdmins()
    } catch (err) {
      setError(err.message || 'Impossible de modifier le rôle')
    } finally {
      setRoleUpdatingId(null)
    }
  }

  const handleResetPassword = async (password) => {
    if (!toResetPassword) return
    setResettingPassword(true)
    setError('')
    setSuccess('')

    try {
      await resetAdminPasswordBySuperAdmin({
        userId: toResetPassword.id,
        password,
      })
      setSuccess(
        `Mot de passe réinitialisé pour ${toResetPassword.full_name || toResetPassword.email}. Communiquez le mot de passe temporaire de façon sécurisée.`,
      )
      setToResetPassword(null)
    } catch (err) {
      setError(err.message || 'Impossible de réinitialiser le mot de passe')
    } finally {
      setResettingPassword(false)
    }
  }

  const handleDelete = async () => {
    if (!toDelete) return
    setError('')
    setSuccess('')

    try {
      await deleteAdminProfile(toDelete.id)
      setSuccess('Accès administrateur retiré.')
      await loadAdmins()
    } catch (err) {
      setError(err.message || 'Impossible de supprimer cet administrateur')
    } finally {
      setToDelete(null)
    }
  }

  const canDemoteOrDelete = (admin) => {
    if (admin.role !== ADMIN_ROLES.SUPER_ADMIN) return true
    return superAdminCount > 1
  }

  return (
    <AdminLayout
      title="Gestion des administrateurs"
      subtitle="Créez des comptes, réinitialisez les mots de passe oubliés et gérez les accès."
    >
      {error && (
        <p className="mb-6 rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}
      {success && (
        <p className="mb-6 rounded-sm bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{success}</p>
      )}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-charcoal-muted">
          {loading ? 'Chargement…' : `${admins.length} compte${admins.length > 1 ? 's' : ''}`}
        </p>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="rounded-sm bg-gold-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-600"
        >
          {showForm ? 'Annuler' : '+ Nouvel administrateur'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="mb-8 rounded-sm border border-beige-200 bg-white p-5 shadow-sm sm:p-8"
        >
          <h3 className="font-display text-xl text-charcoal">Créer un administrateur</h3>
          <p className="mt-1 text-sm text-charcoal-muted">
            Mot de passe temporaire (min. 8 caractères) pour la première connexion.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal-muted">
                Nom complet
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                className="w-full rounded-sm border border-beige-300 px-3 py-2.5 text-sm outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal-muted">
                Email *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-sm border border-beige-300 px-3 py-2.5 text-sm outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal-muted">
                Mot de passe *
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="w-full rounded-sm border border-beige-300 px-3 py-2.5 text-sm outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={creating}
            className="mt-6 rounded-sm bg-charcoal px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-charcoal-light disabled:opacity-60"
          >
            {creating ? 'Création…' : 'Créer le compte'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-sm bg-beige-200" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {admins.map((admin) => {
            const isSelf = admin.id === user?.id
            const canModify = canDemoteOrDelete(admin)

            return (
              <article
                key={admin.id}
                className="rounded-sm border border-beige-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg text-charcoal">
                        {admin.full_name || admin.email}
                      </h3>
                      {isSelf && (
                        <span className="rounded-sm bg-gold-400/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gold-700">
                          Vous
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-charcoal-muted">{admin.email}</p>
                    <p className="mt-1 text-xs text-charcoal-muted/80">
                      Créé le {new Date(admin.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <label className="flex flex-col gap-1">
                      <span className="text-xs font-medium uppercase tracking-wider text-charcoal-muted">
                        Rôle
                      </span>
                      <select
                        value={admin.role}
                        disabled={roleUpdatingId === admin.id || !canModify}
                        onChange={(e) => handleRoleChange(admin.id, e.target.value)}
                        className="rounded-sm border border-beige-300 bg-white px-3 py-2 text-sm outline-none focus:border-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <option value={ADMIN_ROLES.ADMIN}>
                          {ADMIN_ROLE_LABELS[ADMIN_ROLES.ADMIN]}
                        </option>
                        <option value={ADMIN_ROLES.SUPER_ADMIN}>
                          {ADMIN_ROLE_LABELS[ADMIN_ROLES.SUPER_ADMIN]}
                        </option>
                      </select>
                    </label>

                    {!isSelf && (
                      <>
                        <button
                          type="button"
                          onClick={() => setToResetPassword(admin)}
                          className="rounded-sm border border-beige-300 px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-beige-50"
                        >
                          Réinitialiser le MDP
                        </button>
                        <button
                          type="button"
                          disabled={!canModify}
                          onClick={() => setToDelete(admin)}
                          className="rounded-sm border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          title={
                            !canModify
                              ? 'Impossible de retirer le dernier super administrateur'
                              : undefined
                          }
                        >
                          Retirer l&apos;accès
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {!canModify && admin.role === ADMIN_ROLES.SUPER_ADMIN && (
                  <p className="mt-3 text-xs text-amber-700">
                    Ce super administrateur ne peut pas être rétrogradé ou supprimé tant qu&apos;il
                    est le seul.
                  </p>
                )}
              </article>
            )
          })}
        </div>
      )}

      <ResetPasswordModal
        admin={toResetPassword}
        saving={resettingPassword}
        onConfirm={handleResetPassword}
        onCancel={() => setToResetPassword(null)}
      />

      <DeleteConfirmModal
        property={toDelete ? { title: toDelete.full_name || toDelete.email } : null}
        title="Retirer l'accès administrateur ?"
        message={
          toDelete ? (
            <>
              Vous allez retirer l&apos;accès administrateur de{' '}
              <span className="font-medium text-charcoal">
                {toDelete.full_name || toDelete.email}
              </span>
              . Le compte Auth restera actif mais ne pourra plus accéder à l&apos;administration.
            </>
          ) : null
        }
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
        confirmLabel="Retirer l'accès"
      />
    </AdminLayout>
  )
}
