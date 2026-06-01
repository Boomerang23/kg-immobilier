import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { fetchAdminProfile } from '../services/adminService'
import { ADMIN_ROLES } from '../constants/adminRoles'
import { AuthContext } from './AuthContext'

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  const refreshProfile = useCallback(async (userId) => {
    if (!userId) {
      setProfile(null)
      return null
    }

    try {
      const adminProfile = await fetchAdminProfile(userId)
      setProfile(adminProfile)
      return adminProfile
    } catch {
      setProfile(null)
      return null
    }
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return

    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session)
        return refreshProfile(data.session?.user?.id)
      })
      .finally(() => setLoading(false))

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      refreshProfile(nextSession?.user?.id)
    })

    return () => subscription.unsubscribe()
  }, [refreshProfile])

  const signIn = useCallback(async (email, password) => {
    if (!supabase) throw new Error('Supabase non configuré')

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    const adminProfile = await fetchAdminProfile(data.user.id)
    if (!adminProfile) {
      await supabase.auth.signOut()
      throw new Error('Accès refusé. Ce compte n\'est pas autorisé.')
    }

    setSession(data.session)
    setProfile(adminProfile)
    return data.session
  }, [])

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut()
    setSession(null)
    setProfile(null)
  }, [])

  const isAdmin = Boolean(profile)
  const isSuperAdmin = profile?.role === ADMIN_ROLES.SUPER_ADMIN
  const role = profile?.role ?? null

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      role,
      isAdmin,
      isSuperAdmin,
      loading,
      signIn,
      signOut,
      refreshProfile,
      isConfigured: isSupabaseConfigured,
    }),
    [session, profile, role, isAdmin, isSuperAdmin, loading, signIn, signOut, refreshProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
