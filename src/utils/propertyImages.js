export const ALT_COCODY = [
  'Salon et séjour lumineux',
  'Vue d\'ensemble de l\'appartement',
  'Espace de vie aménagé',
  'Cuisine et coin repas',
  'Chambre principale',
  'Salle de bain moderne',
  'Détails des finitions',
  'Autre pièce de vie',
]

export const ALT_GENERIC = [
  'Vue principale du bien',
  'Pièce de vie',
  'Espace intérieur',
  'Chambre ou suite',
  'Salle de bain',
  'Cuisine équipée',
  'Terrasse ou balcon',
  'Finitions intérieures',
]

/**
 * @param {string} slug
 * @param {number} galleryCount - number of gallery-XX.jpeg files (excluding cover)
 * @param {string[]} [alts]
 */
export function buildPropertyImages(slug, galleryCount, alts = ALT_GENERIC) {
  const coverImage = `/images/properties/${slug}/cover.jpeg`
  const galleryImages = [{ src: coverImage, alt: alts[0] || 'Vue principale' }]

  for (let i = 1; i <= galleryCount; i++) {
    galleryImages.push({
      src: `/images/properties/${slug}/gallery-${String(i).padStart(2, '0')}.jpeg`,
      alt: alts[i] || `Photo ${i + 1}`,
    })
  }

  return { coverImage, galleryImages }
}

export const SITE_IMAGES = {
  hero: '/images/site/hero.png',
  about: '/images/properties/appartement-standing-cocody/gallery-03.jpeg',
  contact: '/images/properties/appartement-standing-cocody/gallery-05.jpeg',
}
