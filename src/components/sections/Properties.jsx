import { useState } from 'react'
import Container from '../layout/Container'
import SectionHeader from '../ui/SectionHeader'
import PropertyCard from '../ui/PropertyCard'
import EmptyState from '../ui/EmptyState'
import { PropertyGridSkeleton } from '../ui/Skeletons'
import { useProperties } from '../../hooks/useProperties'

const filters = ['Tous', 'Location', 'Vente', 'Appartement', 'Villa']

export default function Properties() {
  const { properties, loading, error } = useProperties()
  const [activeFilter, setActiveFilter] = useState('Tous')

  const filtered =
    activeFilter === 'Tous'
      ? properties
      : properties.filter(
          (p) => p.transaction === activeFilter || p.type === activeFilter,
        )

  return (
    <section id="biens" className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeader
          label="Nos biens"
          title="Appartements et villas disponibles"
          description="Découvrez notre sélection de biens premium à Abidjan et ses environs. Contactez-nous sur WhatsApp pour organiser une visite."
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-sm px-4 py-2 text-sm transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-charcoal text-white'
                  : 'bg-beige-100 text-charcoal-muted hover:bg-beige-200 hover:text-charcoal'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {loading ? (
          <PropertyGridSkeleton count={6} />
        ) : error ? (
          <EmptyState
            title="Impossible de charger les biens"
            description={error}
          />
        ) : properties.length === 0 ? (
          <EmptyState
            title="Aucun bien disponible"
            description="Revenez bientôt pour découvrir nos nouvelles propriétés à Abidjan."
          />
        ) : (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="py-12 text-center text-charcoal-muted">
                Aucun bien ne correspond à ce filtre pour le moment.
              </p>
            )}
          </>
        )}
      </Container>
    </section>
  )
}
