import { Link } from 'react-router-dom'
import AdminLayout from '../components/admin/AdminLayout'

export default function AccessDeniedPage() {
  return (
    <AdminLayout>
      <div className="mx-auto max-w-lg rounded-sm border border-beige-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h1 className="font-display text-2xl text-charcoal">Accès refusé</h1>
        <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">
          Vous n&apos;avez pas les droits nécessaires pour accéder à cette section.
          Seuls les super administrateurs peuvent gérer les comptes administrateurs.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/admin"
            className="rounded-sm bg-charcoal px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-charcoal-light"
          >
            Retour aux biens
          </Link>
          <Link
            to="/"
            className="rounded-sm border border-beige-300 px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-beige-50"
          >
            Voir le site
          </Link>
        </div>
      </div>
    </AdminLayout>
  )
}
