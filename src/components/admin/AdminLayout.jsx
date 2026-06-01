import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { BRAND } from '../../constants'

function navClass({ isActive }) {
  return [
    'rounded-sm px-4 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-white/15 text-white'
      : 'text-beige-200 hover:bg-white/10 hover:text-white',
  ].join(' ')
}

export default function AdminLayout({ children, title, subtitle }) {
  const { signOut, user, profile, isSuperAdmin } = useAuth()

  return (
    <div className="min-h-screen bg-beige-50">
      <header className="border-b border-beige-200 bg-charcoal text-white">
        <div className="mx-auto max-w-6xl px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold-400">Administration</p>
              <h1 className="font-display text-2xl sm:text-3xl">{BRAND.name}</h1>
              {(profile?.full_name || user?.email) && (
                <p className="mt-1 text-xs text-beige-300">
                  {profile?.full_name ? `${profile.full_name} · ` : ''}
                  {user?.email}
                  {isSuperAdmin && ' · Super admin'}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => signOut()}
                className="rounded-sm border border-white/25 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
              >
                Déconnexion
              </button>
              <Link
                to="/"
                className="rounded-sm border border-white/25 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
              >
                Voir le site
              </Link>
            </div>
          </div>

          <nav className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
            <NavLink to="/admin" end className={navClass}>
              Biens immobiliers
            </NavLink>
            <NavLink to="/admin/account" className={navClass}>
              Mon compte
            </NavLink>
            {isSuperAdmin && (
              <NavLink to="/admin/users" className={navClass}>
                Administrateurs
              </NavLink>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-10">
        {(title || subtitle) && (
          <div className="mb-6">
            {title && <h2 className="font-display text-2xl text-charcoal">{title}</h2>}
            {subtitle && <p className="mt-1 text-sm text-charcoal-muted">{subtitle}</p>}
          </div>
        )}
        {children}
      </main>
    </div>
  )
}
