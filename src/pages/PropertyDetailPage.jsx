import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/layout/Container'
import PropertyCarousel from '../components/property/PropertyCarousel'
import PropertyFeatures from '../components/property/PropertyFeatures'
import BackButton from '../components/ui/BackButton'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { PropertyDetailSkeleton } from '../components/ui/Skeletons'
import { getPropertyWhatsAppMessage } from '../data/properties'
import { getWhatsAppLink } from '../constants'
import { useProperties } from '../hooks/useProperties'

export default function PropertyDetailPage() {
  const { slug } = useParams()
  const { getPropertyBySlug, loading } = useProperties()
  const property = getPropertyBySlug(slug)

  useEffect(() => {
    if (!property) return
    window.scrollTo(0, 0)
    document.title = `${property.title} — KG Immobilier`
    return () => {
      document.title = 'KG Immobilier — Agent immobilier à Abidjan'
    }
  }, [slug, property])

  if (loading) {
    return (
      <div className="bg-beige-50 pt-20 sm:pt-24">
        <Container className="py-8 sm:py-12">
          <PropertyDetailSkeleton />
        </Container>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="bg-beige-50 pt-20 sm:pt-24">
        <Container className="py-12">
          <EmptyState
            title="Bien introuvable"
            description="Ce bien n'existe plus ou l'URL est incorrecte."
          />
        </Container>
      </div>
    )
  }

  return (
    <div className="bg-beige-50 pt-20 sm:pt-24">
      <Container className="py-8 sm:py-12">
        <BackButton />

        <div className="mt-6 grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <PropertyCarousel images={property.galleryImages} />
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-sm bg-charcoal px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
                    {property.transaction}
                  </span>
                  <span className="rounded-sm bg-gold-500/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold-600">
                    {property.type}
                  </span>
                  {property.furnished && (
                    <span className="rounded-sm border border-beige-300 px-3 py-1 text-xs font-medium uppercase tracking-wider text-charcoal-muted">
                      Meublé
                    </span>
                  )}
                </div>

                <h1 className="mt-4 font-display text-3xl leading-tight text-charcoal sm:text-4xl">
                  {property.title}
                </h1>

                <p className="mt-2 flex items-center gap-1.5 text-sm text-charcoal-muted">
                  <svg className="h-4 w-4 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {property.location}
                </p>

                <p className="mt-6 font-display text-3xl text-charcoal sm:text-4xl">{property.price}</p>
              </div>

              <p className="leading-relaxed text-charcoal-muted">{property.description}</p>

              <Button
                href={getWhatsAppLink(getPropertyWhatsAppMessage(property))}
                variant="whatsapp"
                showWhatsAppIcon
                className="w-full py-4 text-base"
              >
                Demander une visite sur WhatsApp
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-beige-200 pt-12">
          <PropertyFeatures property={property} />
        </div>
      </Container>
    </div>
  )
}
