import Container from '../layout/Container'
import Button from '../ui/Button'
import PropertyImage from '../ui/PropertyImage'
import { BRAND, getWhatsAppLink } from '../../constants'
import { SITE_IMAGES } from '../../utils/propertyImages'

export default function Contact() {
  return (
    <section id="contact" className="bg-beige-50 py-20 sm:py-28">
      <Container>
        <div className="overflow-hidden rounded-sm bg-charcoal shadow-2xl">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[280px] lg:min-h-full">
              <PropertyImage
                src={SITE_IMAGES.contact}
                alt="Contact KG Immobilier"
                className="absolute inset-0 h-full w-full"
              />
              <div className="absolute inset-0 bg-charcoal/30" />
            </div>

            <div className="flex flex-col justify-center px-8 py-12 sm:px-12 sm:py-16">
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-gold-400">
                Contact
              </span>
              <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl lg:text-5xl">
                Prêt à visiter votre futur chez-vous ?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-beige-200">
                Contactez-moi directement sur WhatsApp pour planifier une visite, obtenir des
                informations complémentaires ou discuter de votre projet immobilier à Abidjan.
              </p>

              <ul className="mt-8 space-y-4 text-sm text-beige-200">
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gold-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </span>
                  {BRAND.location}
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gold-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-1.23 1.591a.75.75 0 01-1.085.037 12.035 12.035 0 01-4.38-4.38.75.75 0 01.037-1.085l1.591-1.23a.75.75 0 00.417-1.173l-1.106-4.423A.75.75 0 006.375 6.75H5.25A2.25 2.25 0 003 9v.75z" />
                    </svg>
                  </span>
                  {BRAND.whatsapp}
                </li>
              </ul>

              <Button
                href={getWhatsAppLink('Bonjour, je souhaite planifier une visite immobilière avec KG Immobilier.')}
                variant="whatsapp"
                showWhatsAppIcon
                className="mt-10 w-full sm:w-auto"
              >
                Écrire sur WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
