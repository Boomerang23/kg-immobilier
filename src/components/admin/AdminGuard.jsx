import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function AdminGuard({ children }) {
  const { session, isAdmin, loading, isConfigured } = useAuth()
  const location = useLocation()

  if (!isConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-beige-50 px-5">
        <div className="max-w-md rounded-sm border border-beige-200 bg-white p-8 text-center shadow-sm">
          <h1 className="font-display text-2xl text-charcoal">Supabase requis</h1>
          <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">
            Configurez les variables d&apos;environnement Supabase pour accéder à l&apos;administration.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-beige-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-400 border-t-transparent" />
      </div>
    )
  }

  if (!session || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
  }

  return children
}
