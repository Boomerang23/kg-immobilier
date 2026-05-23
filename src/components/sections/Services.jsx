import Container from '../layout/Container'
import SectionHeader from '../ui/SectionHeader'

const services = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: 'Location de biens',
    description:
      'Appartements et villas meublés ou non, sélectionnés pour leur qualité, leur emplacement et leur confort.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
    title: 'Vente immobilière',
    description:
      'Accompagnement complet pour l\'achat ou la vente de votre bien, de la première visite à la signature.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Conseil & expertise',
    description:
      'Analyse du marché, estimation de votre bien et recommandations adaptées à votre budget et vos objectifs.',
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    title: 'Visites sur rendez-vous',
    description:
      'Planifiez votre visite en quelques clics via WhatsApp. Flexibilité et disponibilité pour s\'adapter à votre emploi du temps.',
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-charcoal py-20 sm:py-28">
      <Container>
        <SectionHeader
          light
          label="Services"
          title="Un service complet, pensé pour vous"
          description="De la recherche du bien idéal à la visite et à la négociation, KG Immobilier vous accompagne à chaque étape."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group rounded-sm border border-white/10 bg-charcoal-light p-6 transition-all duration-500 hover:border-gold-400/40 hover:bg-charcoal-light/80"
            >
              <div className="mb-5 inline-flex rounded-sm bg-gold-500/15 p-3 text-gold-400 transition-colors group-hover:bg-gold-500/25 group-hover:text-gold-300">
                {service.icon}
              </div>
              <h3 className="font-display text-xl text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-beige-300">{service.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
