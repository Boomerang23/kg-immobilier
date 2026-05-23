import { Link } from 'react-router-dom'

export default function BackButton({ to = '/#biens', label = 'Retour aux biens' }) {
  const isExternalHash = to.startsWith('/#')

  if (isExternalHash) {
    return (
      <a
        href={to}
        className="group inline-flex items-center gap-2 text-sm font-medium text-charcoal-muted transition-colors hover:text-charcoal"
      >
        <svg
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {label}
      </a>
    )
  }

  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 text-sm font-medium text-charcoal-muted transition-colors hover:text-charcoal"
    >
      <svg
        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
      {label}
    </Link>
  )
}
