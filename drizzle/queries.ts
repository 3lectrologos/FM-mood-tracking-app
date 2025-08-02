import { db } from '@/drizzle/client'
import { data } from '@/drizzle/schema'
import { eq, gte, asc, and } from 'drizzle-orm'
import { subDays } from 'date-fns'
import { formatDate } from '@/lib/utils'
import { getZonedToday } from '@/lib/serverUtils'
import { DataPoint, FormDataType } from '@/schemas/form'

export async function getTodayData(userId: string) {
  const today = await getZonedToday()

  return db
    .select()
    .from(data)
    .where(and(eq(data.userId, userId), eq(data.date, today)))
    .limit(1)
    .then((rows) => {
      if (rows.length === 0) return undefined
      return rows[0] as DataPoint
    })
}

export async function insertTodayData({
  values,
  userId,
}: {
  values: FormDataType
  userId: string
}) {
  const today = await getZonedToday()
  return db
    .insert(data)
    .values({ date: today, userId, ...values })
    .onConflictDoUpdate({
      target: [data.date, data.userId],
      set: { ...values },
    })
}

export async function getRecentData(userId: string, numDays: number) {
  const today = await getZonedToday()
  const startDate = formatDate(subDays(today, numDays))
  return db
    .select()
    .from(data)
    .where(and(eq(data.userId, userId), gte(data.date, startDate)))
    .orderBy(asc(data.date))
    .then((rows) => {
      return rows.map((row) => row as DataPoint)
    })
}
