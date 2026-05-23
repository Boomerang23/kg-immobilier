export const BRAND = {
  name: 'KG Immobilier',
  tagline: 'Votre partenaire immobilier de confiance à Abidjan',
  location: 'Abidjan, Côte d\'Ivoire',
  whatsapp: '+2250758734693',
  whatsappLink: 'https://wa.me/2250758734693',
  email: 'contact@kgimmobilier.ci',
}

export const NAV_LINKS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Biens', href: '#biens' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export function getWhatsAppLink(message) {
  const encoded = encodeURIComponent(message)
  return `${BRAND.whatsappLink}?text=${encoded}`
}
