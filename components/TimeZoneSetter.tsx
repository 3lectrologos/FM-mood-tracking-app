'use client'

import { useEffect } from 'react'

export function TimezoneSetter() {
  useEffect(() => {
    const hasCookie = document.cookie.includes('tz=')
    if (!hasCookie) {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      document.cookie = `tz=${tz}; path=/; max-age=${60 * 60 * 24 * 365}`
    }
  }, [])

  return null
}
