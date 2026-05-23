import Container from '../layout/Container'
import SectionHeader from '../ui/SectionHeader'
import PropertyImage from '../ui/PropertyImage'
import { SITE_IMAGES } from '../../utils/propertyImages'

export default function About() {
  return (
    <section id="apropos" className="bg-beige-50 py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <PropertyImage
              src={SITE_IMAGES.about}
              alt="Intérieur d'appartement KG Immobilier"
              className="aspect-[4/5] rounded-sm"
            />
            <div className="absolute -bottom-6 -right-4 hidden rounded-sm bg-charcoal px-6 py-5 text-white shadow-xl sm:block lg:-right-8">
              <p className="font-display text-3xl text-gold-400">KG</p>
              <p className="mt-1 text-sm text-beige-200">Immobilier de prestige</p>
            </div>
          </div>

          <div>
            <SectionHeader
              align="left"
              label="À propos"
              title="Un accompagnement immobilier personnalisé et de confiance"
              description="Basé à Abidjan, KG Immobilier met son expertise au service de clients exigeants, en quête de biens d'exception."
            />

            <div className="space-y-5 text-base leading-relaxed text-charcoal-muted">
              <p>
                En tant qu&apos;agent immobilier indépendant, je place la relation humaine et la
                transparence au cœur de chaque transaction. Mon objectif : vous faire gagner du
                temps et vous guider sereinement vers le bien qui correspond à vos attentes.
              </p>
              <p>
                Que vous recherchiez un appartement moderne à Cocody, une villa avec piscine à
                Bingerville ou un investissement locatif rentable, je sélectionne pour vous des
                propriétés soigneusement choisies, dans les quartiers les plus prisés d&apos;Abidjan.
              </p>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                'Visites accompagnées sur rendez-vous',
                'Négociation et conseil personnalisé',
                'Biens vérifiés et documentés',
                'Disponibilité WhatsApp 7j/7',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-charcoal">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400/20 text-gold-600">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
