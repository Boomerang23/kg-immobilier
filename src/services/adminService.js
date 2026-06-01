import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { ADMIN_ROLES } from '../constants/adminRoles'

export async function fetchAdminProfile(userId) {
  if (!supabase || !userId) return null

  const { data, error } = await supabase
    .from('admin_profiles')
    .select('id, email, full_name, role, created_at')
    .eq('id', userId)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function checkIsAdmin(userId) {
  const profile = await fetchAdminProfile(userId)
  return Boolean(profile)
}

export async function listAdminProfiles() {
  if (!supabase) throw new Error('Supabase non configuré')

  const { data, error } = await supabase
    .from('admin_profiles')
    .select('id, email, full_name, role, created_at')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function updateAdminRole(userId, role) {
  if (!supabase) throw new Error('Supabase non configuré')
  if (![ADMIN_ROLES.ADMIN, ADMIN_ROLES.SUPER_ADMIN].includes(role)) {
    throw new Error('Rôle invalide')
  }

  const { data, error } = await supabase
    .from('admin_profiles')
    .update({ role })
    .eq('id', userId)
    .select('id, email, full_name, role, created_at')
    .single()

  if (error) throw error
  return data
}

export async function deleteAdminProfile(userId) {
  if (!supabase) throw new Error('Supabase non configuré')

  const { error } = await supabase.from('admin_profiles').delete().eq('id', userId)
  if (error) throw error
}

export async function createAdminUser({ email, password, fullName }) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase non configuré')
  }

  const { data, error } = await supabase.functions.invoke('create-admin-user', {
    body: {
      email: email.trim().toLowerCase(),
      password,
      full_name: fullName?.trim() || null,
    },
  })

  if (error) throw error

  if (data?.error) {
    throw new Error(data.error)
  }

  return data
}

export function isSuperAdminRole(role) {
  return role === ADMIN_ROLES.SUPER_ADMIN
}
