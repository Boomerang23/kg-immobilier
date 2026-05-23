import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { BRAND } from '../constants'

export default function AdminLoginPage() {
  const { signIn, session, isAdmin, loading, isConfigured } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/admin'

  if (!loading && session && isAdmin) {
    return <Navigate to={from} replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await signIn(email.trim(), password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Connexion impossible')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-beige-50 px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-gold-500">Administration</p>
          <h1 className="mt-2 font-display text-3xl text-charcoal">{BRAND.name}</h1>
          <p className="mt-2 text-sm text-charcoal-muted">Connexion agent immobilier</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-sm border border-beige-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {!isConfigured && (
            <p className="mb-4 rounded-sm bg-amber-50 px-3 py-2 text-sm text-amber-800">
              Supabase n&apos;est pas configuré. Ajoutez vos clés dans un fichier <code>.env</code>.
            </p>
          )}

          {error && (
            <p className="mb-4 rounded-sm bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}

          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal-muted">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded-sm border border-beige-300 px-3 py-2.5 text-sm outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
            autoComplete="email"
          />

          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal-muted">
            Mot de passe
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 w-full rounded-sm border border-beige-300 px-3 py-2.5 text-sm outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
            autoComplete="current-password"
          />

          <button
            type="submit"
            disabled={submitting || !isConfigured}
            className="w-full rounded-sm bg-charcoal py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal-light disabled:opacity-60"
          >
            {submitting ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p className="mt-6 text-center">
          <Link to="/" className="text-sm text-charcoal-muted transition-colors hover:text-charcoal">
            ← Retour au site
          </Link>
        </p>
      </div>
    </div>
  )
}
