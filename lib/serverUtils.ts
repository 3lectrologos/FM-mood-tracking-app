import { cookies } from 'next/headers'
import { toZonedTime } from 'date-fns-tz'
import { formatDate } from '@/lib/utils'

export async function getZonedToday() {
  const cookieStore = await cookies()
  const timezone = cookieStore.get('tz')?.value || 'UTC'
  const zonedToday = toZonedTime(new Date(), timezone)
  return formatDate(zonedToday)
}
