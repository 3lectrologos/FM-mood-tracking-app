'use server'

import { FormDataType, formSchema } from '@/schemas/form'
import { insertTodayData } from '@/drizzle/queries'
import { revalidatePath } from 'next/cache'
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

  await insertTodayData({
    values: data,
    userId: session.user.id,
  })
  revalidatePath('/')
}
