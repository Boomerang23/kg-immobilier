import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Container from './Container'
import Button from '../ui/Button'
import { BRAND, NAV_LINKS, getWhatsAppLink } from '../../constants'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const navHref = (hash) => (isHome ? hash : `/${hash}`)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-charcoal/90 backdrop-blur-md">
      <Container>
        <nav className="flex h-16 items-center justify-between sm:h-20">
          <Link to="/" className="group flex flex-col">
            <span className="font-display text-xl tracking-wide text-white sm:text-2xl">
              {BRAND.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-400 transition-colors group-hover:text-gold-300">
              Abidjan
            </span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={navHref(link.href)}
                  className="text-sm text-beige-200 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button
              href={getWhatsAppLink('Bonjour, je souhaite en savoir plus sur vos biens immobiliers.')}
              variant="whatsapp"
              showWhatsAppIcon
              className="px-5 py-2.5 text-xs uppercase tracking-wider"
            >
              WhatsApp
            </Button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-sm text-white lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {open && (
          <div className="border-t border-white/10 pb-6 pt-4 lg:hidden">
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={navHref(link.href)}
                    className="block text-base text-beige-200 transition-colors hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button
              href={getWhatsAppLink('Bonjour, je souhaite en savoir plus sur vos biens immobiliers.')}
              variant="whatsapp"
              showWhatsAppIcon
              className="mt-6 w-full"
            >
              Contacter sur WhatsApp
            </Button>
          </div>
        )}
      </Container>
    </header>
  )
}
