import { db } from '@/drizzle/client'
import { data } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { DataPoint } from '@/types'

export async function getTodayData() {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  return db
    .select()
    .from(data)
    .where(eq(data.date, today))
    .limit(1)
    .then((rows) => {
      if (rows.length === 0) return undefined
      return rows[0] as DataPoint
    })
}
