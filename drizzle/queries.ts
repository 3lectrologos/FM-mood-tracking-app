import { db } from '@/drizzle/client'
import { data } from '@/drizzle/schema'
import { eq, gte, asc } from 'drizzle-orm'
import { DataPoint } from '@/types'
import { subDays } from 'date-fns'
import { formatDate } from '@/lib/utils'

export async function getTodayData() {
  const today = formatDate(new Date())
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

export async function insertTodayData({ values }: { values: DataPoint }) {
  return db.insert(data).values(values)
}

export async function getRecentData(numDays: number) {
  const startDate = formatDate(subDays(new Date(), numDays))
  return db
    .select()
    .from(data)
    .where(gte(data.date, startDate))
    .orderBy(asc(data.date))
    .then((rows) => {
      return rows.map((row) => row as DataPoint)
    })
}
