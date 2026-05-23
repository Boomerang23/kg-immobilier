import Container from '../layout/Container'
import Button from '../ui/Button'
import PropertyImage from '../ui/PropertyImage'
import { BRAND, getWhatsAppLink } from '../../constants'
import { SITE_IMAGES } from '../../utils/propertyImages'

export default function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen">
      <div className="absolute inset-0">
        <PropertyImage
          src={SITE_IMAGES.hero}
          alt="Appartement de prestige à Abidjan"
          className="h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/40" />
      </div>

      <Container className="relative flex min-h-screen flex-col justify-center pt-20 pb-16">
        <div className="max-w-3xl">
          <span className="mb-6 inline-block text-xs font-medium uppercase tracking-[0.3em] text-gold-400">
            Agent immobilier indépendant · Abidjan
          </span>

          <h1 className="font-display text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Trouvez le bien{' '}
            <span className="italic text-gold-300">d&apos;exception</span> qui vous correspond
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-beige-200 sm:text-lg">
            {BRAND.name} vous accompagne dans la découverte d&apos;appartements et de villas
            premium à Abidjan. Un service personnalisé, transparent et à votre écoute.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="#biens" variant="gold" className="px-8">
              Voir les biens disponibles
            </Button>
            <Button
              href={getWhatsAppLink('Bonjour, je souhaite planifier une visite immobilière.')}
              variant="whatsapp"
              showWhatsAppIcon
              className="px-8"
            >
              Planifier une visite
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:max-w-md">
            <div>
              <p className="font-display text-3xl text-white sm:text-4xl">50+</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-beige-300">Biens gérés</p>
            </div>
            <div>
              <p className="font-display text-3xl text-white sm:text-4xl">100%</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-beige-300">Sur mesure</p>
            </div>
          </div>
        </div>
      </Container>

      <a
        href="#apropos"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-beige-300 transition-colors hover:text-white sm:flex"
        aria-label="Défiler vers le bas"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Découvrir</span>
        <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </a>
    </section>
  )
}
