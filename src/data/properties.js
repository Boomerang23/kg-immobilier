import { buildPropertyImages, ALT_COCODY } from '../utils/propertyImages'

const cocody = buildPropertyImages('appartement-standing-cocody', 7, ALT_COCODY)
const bingerville = buildPropertyImages('villa-contemporaine-bingerville', 1)
const plateau = buildPropertyImages('penthouse-terrasse-plateau', 1)
const assinie = buildPropertyImages('villa-piscine-assinie', 1)
const marcory = buildPropertyImages('studio-meuble-marcory', 1)
const deuxPlateaux = buildPropertyImages('duplex-prestige-deux-plateaux', 1)

export const defaultProperties = [
  {
    id: 1,
    slug: 'appartement-standing-cocody',
    title: 'Appartement standing — Cocody',
    type: 'Appartement',
    location: 'Cocody, Abidjan',
    price: '450 000 FCFA / mois',
    transaction: 'Location',
    bedrooms: 3,
    bathrooms: 2,
    area: 145,
    parking: 2,
    floors: 4,
    yearBuilt: 2021,
    furnished: true,
    coverImage: cocody.coverImage,
    galleryImages: cocody.galleryImages,
    description:
      'Magnifique appartement de standing situé dans le quartier prisé de Cocody. Ce bien offre des finitions haut de gamme, une cuisine entièrement équipée, un grand salon baigné de lumière et une vue dégagée sur la verdure environnante. Idéal pour une famille ou un cadre expatrié recherchant confort et sécurité.',
    features: [
      'Climatisation centralisée',
      'Groupe électrogène',
      'Ascenseur',
      'Gardien 24h/24',
      'Interphone vidéo',
      'Cuisine équipée',
    ],
    featured: true,
  },
  {
    id: 2,
    slug: 'villa-contemporaine-bingerville',
    title: 'Villa contemporaine — Bingerville',
    type: 'Villa',
    location: 'Bingerville',
    price: '185 000 000 FCFA',
    transaction: 'Vente',
    bedrooms: 5,
    bathrooms: 4,
    area: 320,
    parking: 3,
    floors: 2,
    yearBuilt: 2019,
    furnished: false,
    coverImage: bingerville.coverImage,
    galleryImages: bingerville.galleryImages,
    description:
      'Villa d\'architecte au design épuré, nichée dans un écrin de verdure à Bingerville. Les volumes généreux, les grandes baies vitrées et la piscine à débordement en font un bien d\'exception pour une famille exigeante. Quartier calme et sécurisé, à proximité des écoles internationales.',
    features: [
      'Piscine à débordement',
      'Jardin paysager',
      'Domotique',
      'Garage couvert 3 places',
      'Suite parentale',
      'Buanderie',
    ],
    featured: true,
  },
  {
    id: 3,
    slug: 'penthouse-terrasse-plateau',
    title: 'Penthouse avec terrasse — Plateau',
    type: 'Appartement',
    location: 'Plateau, Abidjan',
    price: '680 000 FCFA / mois',
    transaction: 'Location',
    bedrooms: 4,
    bathrooms: 3,
    area: 210,
    parking: 2,
    floors: 12,
    yearBuilt: 2022,
    furnished: true,
    coverImage: plateau.coverImage,
    galleryImages: plateau.galleryImages,
    description:
      'Penthouse exclusif au cœur du Plateau, offrant une terrasse panoramique avec vue imprenable sur la lagune Ébrié. Ce bien allie standing, emplacement stratégique et prestations premium pour une clientèle corporate ou diplomatique.',
    features: [
      'Terrasse panoramique 80 m²',
      'Vue lagune',
      'Conciergerie',
      'Salle de sport',
      'Parking sécurisé',
      'Mobilier haut de gamme',
    ],
    featured: false,
  },
  {
    id: 4,
    slug: 'villa-piscine-assinie',
    title: 'Villa avec piscine — Assinie',
    type: 'Villa',
    location: 'Assinie',
    price: '250 000 000 FCFA',
    transaction: 'Vente',
    bedrooms: 6,
    bathrooms: 5,
    area: 450,
    parking: 4,
    floors: 2,
    yearBuilt: 2020,
    furnished: true,
    coverImage: assinie.coverImage,
    galleryImages: assinie.galleryImages,
    description:
      'Villa de prestige en bord de mer à Assinie, parfaite comme résidence secondaire ou investissement locatif haut de gamme. Accès direct à la plage, piscine à débordement, 6 chambres en suite et un vaste espace de réception pour vos moments en famille.',
    features: [
      'Accès plage privé',
      'Piscine infinity',
      '6 chambres en suite',
      'Cuisine professionnelle',
      'Staff quarters',
      'Panneaux solaires',
    ],
    featured: true,
  },
  {
    id: 5,
    slug: 'studio-meuble-marcory',
    title: 'Studio meublé — Marcory',
    type: 'Appartement',
    location: 'Marcory, Zone 4',
    price: '280 000 FCFA / mois',
    transaction: 'Location',
    bedrooms: 1,
    bathrooms: 1,
    area: 55,
    parking: 1,
    floors: 3,
    yearBuilt: 2023,
    furnished: true,
    coverImage: marcory.coverImage,
    galleryImages: marcory.galleryImages,
    description:
      'Studio entièrement meublé et fonctionnel en plein cœur de Marcory Zone 4. Parfait pour un jeune professionnel ou un séjour de moyenne durée. Proche des commerces, restaurants et axes principaux d\'Abidjan.',
    features: [
      'Entièrement meublé',
      'Climatisation',
      'Internet fibre',
      'Eau chaude',
      'Sécurité immeuble',
      'Proche commodités',
    ],
    featured: false,
  },
  {
    id: 6,
    slug: 'duplex-prestige-deux-plateaux',
    title: 'Duplex de prestige — Deux Plateaux',
    type: 'Appartement',
    location: 'Deux Plateaux, Abidjan',
    price: '95 000 000 FCFA',
    transaction: 'Vente',
    bedrooms: 4,
    bathrooms: 3,
    area: 185,
    parking: 2,
    floors: 2,
    yearBuilt: 2018,
    furnished: false,
    coverImage: deuxPlateaux.coverImage,
    galleryImages: deuxPlateaux.galleryImages,
    description:
      'Duplex spacieux aux Deux Plateaux, dans une résidence sécurisée et recherchée. Double hauteur sous plafond au salon, quatre chambres dont une suite parentale, et un emplacement privilégié à proximité des ambassades et centres commerciaux.',
    features: [
      'Double hauteur salon',
      'Résidence sécurisée',
      'Parquet massif',
      'Dressing intégré',
      'Balcon filant',
      'Charges modérées',
    ],
    featured: false,
  },
]

export const galleryImages = [
  {
    id: 1,
    src: cocody.galleryImages[0].src,
    alt: cocody.galleryImages[0].alt,
    span: 'col-span-2 row-span-2',
  },
  {
    id: 2,
    src: cocody.galleryImages[2].src,
    alt: cocody.galleryImages[2].alt,
    span: 'col-span-1 row-span-1',
  },
  {
    id: 3,
    src: cocody.galleryImages[4].src,
    alt: cocody.galleryImages[4].alt,
    span: 'col-span-1 row-span-1',
  },
  {
    id: 4,
    src: cocody.galleryImages[5].src,
    alt: cocody.galleryImages[5].alt,
    span: 'col-span-1 row-span-2',
  },
  {
    id: 5,
    src: cocody.galleryImages[6].src,
    alt: cocody.galleryImages[6].alt,
    span: 'col-span-1 row-span-1',
  },
  {
    id: 6,
    src: cocody.galleryImages[3].src,
    alt: cocody.galleryImages[3].alt,
    span: 'col-span-2 row-span-1',
  },
]

export function getPropertyBySlug(slug, list = defaultProperties) {
  return list.find((p) => p.slug === slug)
}

export function getPropertyWhatsAppMessage(property) {
  return `Bonjour, je suis intéressé(e) par le bien "${property.title}" (${property.transaction} — ${property.price}) à ${property.location}. Pouvez-vous m'en dire plus et planifier une visite ?`
}
