'use server'

import { FormDataType, formSchema } from '@/schemas/form'
import { insertTodayData } from '@/drizzle/queries'
import { revalidatePath } from 'next/cache'
import { formatDate } from '@/lib/utils'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function submitFormData(data: FormDataType) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    console.error('User not authenticated')
    return { error: 'User not authenticated' }
  }

  console.log('Submit action triggered with state:', data)
  const { error } = formSchema.safeParse(data)
  if (error) {
    console.error('Validation error:', error)
    return { error: error.message }
  }

  // TODO: Maybe move this to the query function?
  const today = formatDate(new Date())
  await insertTodayData({
    values: { ...data, date: today, userId: session.user.id },
  })
  revalidatePath('/')
}
