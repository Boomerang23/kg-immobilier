import { Link } from 'react-router-dom'
import Button from './Button'
import PropertyImage from './PropertyImage'

function BedIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5M3.75 6.75h16.5M3.75 17.25h16.5" />
    </svg>
  )
}

function BathIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 6.75h6M9 6.75a3 3 0 016 0M9 6.75V4.5m6 2.25V4.5m-9 12h12a2.25 2.25 0 002.25-2.25V9.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 9.75v6.75A2.25 2.25 0 006.75 18.75z"
      />
    </svg>
  )
}

function AreaIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5h16.5M9 9l3 3 6-6" />
    </svg>
  )
}

export default function PropertyCard({ property }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-charcoal/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/properties/${property.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <PropertyImage
          src={property.coverImage}
          alt={property.title}
          className="h-full w-full"
          hoverZoom
          priority={property.featured}
        />
        <span className="absolute left-4 top-4 z-10 rounded-sm bg-white/95 px-3 py-1 text-xs font-medium uppercase tracking-wider text-charcoal backdrop-blur-sm">
          {property.transaction}
        </span>
        {property.featured && (
          <span className="absolute right-4 top-4 z-10 rounded-sm bg-gold-500 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
            Coup de cœur
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <Link to={`/properties/${property.slug}`} className="transition-colors hover:text-gold-600">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gold-500">
            {property.type}
          </p>
          <h3 className="font-display text-xl text-charcoal sm:text-2xl">{property.title}</h3>
          <p className="mt-1 text-sm text-charcoal-muted">{property.location}</p>
        </Link>

        <p className="font-display text-2xl text-charcoal">{property.price}</p>

        <div className="flex flex-wrap gap-4 border-t border-beige-200 pt-4 text-sm text-charcoal-muted">
          <span className="inline-flex items-center gap-1.5">
            <BedIcon />
            {property.bedrooms} ch.
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BathIcon />
            {property.bathrooms} sdb
          </span>
          <span className="inline-flex items-center gap-1.5">
            <AreaIcon />
            {property.area} m²
          </span>
        </div>

        <div className="mt-auto flex flex-col gap-2 sm:flex-row">
          <Button href={`/properties/${property.slug}`} variant="gold" className="flex-1">
            Voir le bien
          </Button>
        </div>
      </div>
    </article>
  )
}
