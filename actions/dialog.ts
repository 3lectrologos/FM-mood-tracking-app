'use server'

import { FormDataType, formSchema } from '@/schemas/form'
import { insertTodayData } from '@/drizzle/queries'
import { revalidatePath } from 'next/cache'

export async function submitFormData(data: FormDataType) {
  console.log('Submit action triggered with state:', data)
  const { error } = formSchema.safeParse(data)
  if (error) {
    console.error('Validation error:', error)
    return { error: error.message }
  }
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  await insertTodayData({ values: { ...data, date: today } })
  revalidatePath('/')
}
