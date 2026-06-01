import { useAuth } from '../../hooks/useAuth'
import AccessDeniedPage from '../../pages/AccessDeniedPage'

export default function SuperAdminGuard({ children }) {
  const { isSuperAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-beige-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-400 border-t-transparent" />
      </div>
    )
  }

  if (!isSuperAdmin) {
    return <AccessDeniedPage />
  }

  return children
}
