import Container from './Container'
import { Link } from 'react-router-dom'
import { BRAND, NAV_LINKS, getWhatsAppLink } from '../../constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-beige-200 bg-charcoal text-beige-200">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl text-white">{BRAND.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-beige-300">
              Agent immobilier indépendant à Abidjan, spécialisé dans la location et la vente de
              biens d&apos;exception en Côte d&apos;Ivoire.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold-400">
              Navigation
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={`/${link.href}`} className="text-sm transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold-400">
              Contact
            </p>
            <ul className="space-y-2 text-sm">
              <li>{BRAND.location}</li>
              <li>
                <a
                  href={getWhatsAppLink('Bonjour')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {BRAND.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-beige-400">
            © {year} {BRAND.name}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-xs text-beige-500 transition-colors hover:text-beige-300">
              Admin
            </Link>
            <p className="text-xs text-beige-400">Conçu avec élégance pour Abidjan</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
