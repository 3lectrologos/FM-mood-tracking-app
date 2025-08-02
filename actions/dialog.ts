'use server'

import { FormDataType, formSchema } from '@/schemas/form'
import { getTodayData, insertTodayData } from '@/drizzle/queries'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function submitFormData(data: Partial<FormDataType>) {
  console.log('Submit action triggered with state:', data)

  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) {
    console.error('User not authenticated')
    return { error: 'User not authenticated' }
  }

  const todayData = await getTodayData(session.user.id)

  if (todayData) {
    const res = formSchema.partial().safeParse(data)
    if (!res.success) {
      console.error('Validation error:', res.error)
      return { error: res.error.message }
    }
    data = { ...todayData, ...data } as FormDataType
  } else {
    const res = formSchema.safeParse(data)
    if (!res.success) {
      console.error('Validation error:', res.error)
      return { error: res.error.message }
    }
    data = res.data as FormDataType
  }

  await insertTodayData({
    values: data,
    userId: session.user.id,
  })
  revalidatePath('/')
}
