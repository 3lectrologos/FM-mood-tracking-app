'use client'

import { useEffect } from 'react'
import { updateTimezone } from '@/actions/timezone'
import { useRouter } from 'next/navigation'

export function TimezoneSetter() {
  const router = useRouter()

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    updateTimezone(timezone).then(() => router.refresh())
  }, [router])

  return null
}
