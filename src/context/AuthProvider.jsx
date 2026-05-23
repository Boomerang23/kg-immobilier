import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { checkIsAdmin } from '../services/propertyService'
import { AuthContext } from './AuthContext'

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  const refreshAdmin = useCallback(async (userId) => {
    if (!userId) {
      setIsAdmin(false)
      return
    }
    const admin = await checkIsAdmin(userId)
    setIsAdmin(admin)
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return

    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session)
        return refreshAdmin(data.session?.user?.id)
      })
      .finally(() => setLoading(false))

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      refreshAdmin(nextSession?.user?.id)
    })

    return () => subscription.unsubscribe()
  }, [refreshAdmin])

  const signIn = useCallback(async (email, password) => {
    if (!supabase) throw new Error('Supabase non configuré')

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    const admin = await checkIsAdmin(data.user.id)
    if (!admin) {
      await supabase.auth.signOut()
      throw new Error('Accès refusé. Ce compte n\'est pas autorisé.')
    }

    setSession(data.session)
    setIsAdmin(true)
    return data.session
  }, [])

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut()
    setSession(null)
    setIsAdmin(false)
  }, [])

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      isAdmin,
      loading,
      signIn,
      signOut,
      isConfigured: isSupabaseConfigured,
    }),
    [session, isAdmin, loading, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
