import { supabase, STORAGE_BUCKET, isSupabaseConfigured } from '../lib/supabase'

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i

function extFromFile(file) {
  const name = file.name.toLowerCase()
  const match = name.match(IMAGE_EXT)
  if (match) return match[0].replace('.', '')
  if (file.type === 'image/png') return 'png'
  if (file.type === 'image/webp') return 'webp'
  return 'jpg'
}

export async function uploadPropertyImage(file, propertyId, label = 'image') {
  if (!supabase) throw new Error('Supabase non configuré')

  const ext = extFromFile(file)
  const path = `${propertyId}/${label}-${crypto.randomUUID()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false })

  if (uploadError) throw uploadError

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)

  return { url: data.publicUrl, storagePath: path }
}

export async function deleteStorageFiles(paths) {
  if (!supabase || !paths.length) return

  const { error } = await supabase.storage.from(STORAGE_BUCKET).remove(paths)
  if (error) throw error
}

export async function deletePropertyImagesByIds(imageIds) {
  if (!supabase || !imageIds.length) return

  const { data: images, error: fetchError } = await supabase
    .from('property_images')
    .select('id, storage_path')
    .in('id', imageIds)

  if (fetchError) throw fetchError

  const paths = (images ?? []).map((img) => img.storage_path).filter(Boolean)
  await deleteStorageFiles(paths)

  const { error: deleteError } = await supabase.from('property_images').delete().in('id', imageIds)
  if (deleteError) throw deleteError
}

export { isSupabaseConfigured }
