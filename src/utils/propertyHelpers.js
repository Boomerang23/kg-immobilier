export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function emptyPropertyForm() {
  return {
    id: null,
    slug: '',
    title: '',
    price: '',
    location: 'Abidjan',
    type: 'Appartement',
    status: 'Location',
    description: '',
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    area: 80,
    coverImageUrl: '',
    features: [],
    featured: false,
    furnished: false,
    floors: 1,
    yearBuilt: new Date().getFullYear(),
    existingGallery: [],
    coverFile: null,
    galleryFiles: [],
    removedImageIds: [],
  }
}

export function mapPropertyRow(row) {
  const images = (row.property_images ?? []).sort((a, b) => a.sort_order - b.sort_order)
  const coverUrl = row.cover_image_url || images.find((img) => img.is_cover)?.url || ''

  const galleryImages = []
  if (coverUrl) {
    galleryImages.push({ src: coverUrl, alt: row.title })
  }

  images
    .filter((img) => img.url && img.url !== coverUrl)
    .forEach((img) => {
      galleryImages.push({
        src: img.url,
        alt: img.alt_text || row.title,
      })
    })

  if (galleryImages.length === 0 && coverUrl) {
    galleryImages.push({ src: coverUrl, alt: row.title })
  }

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    price: row.price,
    location: row.location,
    type: row.type,
    transaction: row.status,
    status: row.status,
    description: row.description,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    parking: row.parking,
    area: row.area,
    coverImage: coverUrl,
    coverImageUrl: coverUrl,
    galleryImages,
    features: row.features ?? [],
    featured: row.featured,
    furnished: row.furnished,
    floors: row.floors,
    yearBuilt: row.year_built,
    existingGallery: images.map((img) => ({
      id: img.id,
      url: img.url,
      storagePath: img.storage_path,
      alt: img.alt_text || row.title,
      isCover: img.is_cover,
      sortOrder: img.sort_order,
    })),
  }
}

export function toPropertyRecord(property) {
  return {
    id: property.id,
    slug: property.slug,
    title: property.title,
    price: property.price,
    location: property.location,
    type: property.type,
    status: property.transaction ?? property.status,
    description: property.description,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    parking: property.parking,
    area: property.area,
    coverImage: property.coverImage ?? property.coverImageUrl,
    coverImageUrl: property.coverImage ?? property.coverImageUrl,
    features: property.features ?? [],
    featured: property.featured ?? false,
    furnished: property.furnished ?? false,
    floors: property.floors ?? 1,
    yearBuilt: property.yearBuilt ?? property.year_built,
    existingGallery: property.existingGallery ?? [],
  }
}
