import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { defaultProperties } from '../data/properties'
import { mapPropertyRow, slugify } from '../utils/propertyHelpers'
import {
  uploadPropertyImage,
  deletePropertyImagesByIds,
  deleteStorageFiles,
} from './imageService'

const PROPERTY_SELECT = `
  *,
  property_images (*)
`

export async function fetchProperties() {
  if (!isSupabaseConfigured) {
    return { properties: defaultProperties, source: 'fallback' }
  }

  const { data, error } = await supabase
    .from('properties')
    .select(PROPERTY_SELECT)
    .order('created_at', { ascending: false })

  if (error) throw error

  const properties = (data ?? []).map(mapPropertyRow)
  return { properties, source: 'supabase' }
}

export async function fetchPropertyBySlug(slug) {
  if (!isSupabaseConfigured) {
    return defaultProperties.find((p) => p.slug === slug) ?? null
  }

  const { data, error } = await supabase
    .from('properties')
    .select(PROPERTY_SELECT)
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw error
  return data ? mapPropertyRow(data) : null
}

function buildPropertyPayload(form) {
  const slug = form.slug?.trim() || slugify(form.title)

  return {
    slug,
    title: form.title.trim(),
    price: form.price.trim(),
    location: form.location.trim(),
    type: form.type,
    status: form.status,
    description: form.description.trim(),
    bedrooms: Number(form.bedrooms),
    bathrooms: Number(form.bathrooms),
    parking: Number(form.parking),
    area: Number(form.area),
    features: form.features ?? [],
    featured: Boolean(form.featured),
    furnished: Boolean(form.furnished),
    floors: Number(form.floors ?? 1),
    year_built: Number(form.yearBuilt ?? new Date().getFullYear()),
  }
}

export async function saveProperty(form) {
  if (!isSupabaseConfigured) throw new Error('Supabase non configuré')

  const payload = buildPropertyPayload(form)
  let propertyId = form.id

  if (propertyId) {
    const { error } = await supabase
      .from('properties')
      .update({ ...payload, cover_image_url: form.coverImageUrl || form.coverImage })
      .eq('id', propertyId)

    if (error) throw error
  } else {
    const { data, error } = await supabase
      .from('properties')
      .insert({ ...payload, cover_image_url: form.coverImageUrl || '' })
      .select('id')
      .single()

    if (error) throw error
    propertyId = data.id
  }

  if (form.removedImageIds?.length) {
    await deletePropertyImagesByIds(form.removedImageIds)
  }

  if (form.coverFile) {
    const { url, storagePath } = await uploadPropertyImage(form.coverFile, propertyId, 'cover')

    await supabase.from('property_images').delete().eq('property_id', propertyId).eq('is_cover', true)

    await supabase.from('property_images').insert({
      property_id: propertyId,
      url,
      storage_path: storagePath,
      alt_text: form.title,
      sort_order: 0,
      is_cover: true,
    })

    await supabase.from('properties').update({ cover_image_url: url }).eq('id', propertyId)
  }

  if (form.galleryFiles?.length) {
    const existingCount = form.existingGallery?.filter((img) => !form.removedImageIds?.includes(img.id)).length ?? 0
    let sortOrder = existingCount + 1

    for (const file of form.galleryFiles) {
      const { url, storagePath } = await uploadPropertyImage(file, propertyId, 'gallery')

      await supabase.from('property_images').insert({
        property_id: propertyId,
        url,
        storage_path: storagePath,
        alt_text: `${form.title} — photo ${sortOrder + 1}`,
        sort_order: sortOrder,
        is_cover: false,
      })

      sortOrder += 1
    }
  }

  const { data, error } = await supabase
    .from('properties')
    .select(PROPERTY_SELECT)
    .eq('id', propertyId)
    .single()

  if (error) throw error
  return mapPropertyRow(data)
}

export async function deleteProperty(propertyId) {
  if (!isSupabaseConfigured) throw new Error('Supabase non configuré')

  const { data: images, error: imagesError } = await supabase
    .from('property_images')
    .select('storage_path')
    .eq('property_id', propertyId)

  if (imagesError) throw imagesError

  const paths = (images ?? []).map((img) => img.storage_path).filter(Boolean)
  await deleteStorageFiles(paths)

  const { error } = await supabase.from('properties').delete().eq('id', propertyId)
  if (error) throw error
}

export async function checkIsAdmin(userId) {
  if (!supabase || !userId) return false

  const { data, error } = await supabase
    .from('admin_profiles')
    .select('id')
    .eq('id', userId)
    .maybeSingle()

  if (error) return false
  return Boolean(data)
}
