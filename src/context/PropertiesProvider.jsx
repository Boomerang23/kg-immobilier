import { useCallback, useEffect, useMemo, useState } from 'react'
import { PropertiesContext } from './PropertiesContext'
import { fetchProperties, saveProperty, deleteProperty } from '../services/propertyService'
import { toPropertyRecord } from '../utils/propertyHelpers'
import { isSupabaseConfigured } from '../lib/supabase'

export default function PropertiesProvider({ children }) {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [source, setSource] = useState('loading')

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetchProperties()
      setProperties(result.properties)
      setSource(result.source)
    } catch (err) {
      setError(err.message || 'Impossible de charger les biens')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function init() {
      setError(null)
      try {
        const result = await fetchProperties()
        if (!cancelled) {
          setProperties(result.properties)
          setSource(result.source)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Impossible de charger les biens')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    init()
    return () => {
      cancelled = true
    }
  }, [])

  const upsertProperty = useCallback(
    async (form) => {
      if (!isSupabaseConfigured) throw new Error('Supabase non configuré')
      const saved = await saveProperty(form)
      setProperties((prev) => {
        const index = prev.findIndex((p) => p.id === saved.id)
        if (index >= 0) {
          const next = [...prev]
          next[index] = saved
          return next
        }
        return [saved, ...prev]
      })
      setSource('supabase')
      return saved
    },
    [],
  )

  const removeProperty = useCallback(async (id) => {
    if (!isSupabaseConfigured) throw new Error('Supabase non configuré')
    await deleteProperty(id)
    setProperties((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const records = useMemo(() => properties.map(toPropertyRecord), [properties])

  const value = useMemo(
    () => ({
      properties,
      records,
      loading,
      error,
      source,
      refresh: load,
      upsertProperty,
      deleteProperty: removeProperty,
      getPropertyBySlug: (slug) => properties.find((p) => p.slug === slug),
      isSupabaseConfigured,
    }),
    [properties, records, loading, error, source, load, upsertProperty, removeProperty],
  )

  return <PropertiesContext.Provider value={value}>{children}</PropertiesContext.Provider>
}
