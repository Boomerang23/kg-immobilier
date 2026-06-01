import Container from '../layout/Container'
import SectionHeader from '../ui/SectionHeader'
import { useState } from 'react'

export default function About() {
  const [imageSrc, setImageSrc] = useState('/images/agent/profile.jpeg')
  const [imageMissing, setImageMissing] = useState(false)

  const handleImageError = () => {
    if (imageSrc.endsWith('profile.jpeg')) {
      setImageSrc('/images/agent/profile.jpg')
      return
    }

    setImageMissing(true)
  }

  return (
    <section id="apropos" className="bg-beige-50 py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-1 mx-auto w-full max-w-md lg:order-none lg:max-w-none">
            <div className="pointer-events-none absolute -inset-3 hidden rounded-[2rem] border border-gold-500/25 bg-gradient-to-br from-gold-200/10 via-transparent to-gold-500/5 lg:block" />
            <div className="overflow-hidden rounded-3xl border border-gold-500/20 bg-white/70 shadow-[0_20px_50px_-20px_rgba(18,18,18,0.35)] backdrop-blur-sm">
              {imageMissing ? (
                <div className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-beige-100 via-beige-50 to-white p-8 text-center">
                  <div>
                    <p className="font-display text-xl text-charcoal">Photo de l&apos;agent</p>
                    <p className="mt-2 text-sm text-charcoal-muted">
                      Ajoutez l&apos;image dans `public/images/agent/profile.jpeg`
                    </p>
                  </div>
                </div>
              ) : (
                <img
                  src={imageSrc}
                  alt="Portrait de l'agent immobilier indépendant KG Immobilier"
                  onError={handleImageError}
                  className="aspect-[4/5] w-full object-cover object-center"
                  loading="lazy"
                />
              )}
            </div>
            <div className="absolute left-4 top-4 rounded-full border border-gold-400/50 bg-charcoal/85 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-gold-200 shadow-lg backdrop-blur-sm sm:text-[11px]">
              Agent indépendant
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/30" />
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-charcoal px-6 py-5 text-white shadow-xl sm:block lg:-right-8">
              <p className="font-display text-3xl text-gold-400">KG</p>
              <p className="mt-1 text-sm text-beige-200">Immobilier de prestige</p>
            </div>
          </div>

          <div className="order-2 lg:order-none">
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
