'use client'

import { useEffect } from 'react'

export function TimezoneSetter() {
  useEffect(() => {
    const cookieTimezone = document.cookie
      .split('; ')
      .find((row) => row.startsWith('tz='))
      ?.split('=')[1]
    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (cookieTimezone !== currentTimezone) {
      document.cookie = `tz=${currentTimezone}; path=/; max-age=${60 * 60 * 24 * 365}`
    }
  }, [])

  return null
}
