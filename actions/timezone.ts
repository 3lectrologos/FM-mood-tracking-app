'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function updateTimezone(timezone: string) {
  const cookieStore = await cookies()
  const currentTimezone = cookieStore.get('tz')?.value

  if (currentTimezone !== timezone) {
    cookieStore.set({
      name: 'tz',
      value: timezone,
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })

    revalidatePath('/')
  }
}
