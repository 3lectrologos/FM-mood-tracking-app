'use server'

import { SleepActionState } from '@/components/SleepForm'
import { moodSchema } from '@/schemas/log'

export async function sleepAction(
  state: SleepActionState,
  formData: FormData
): Promise<SleepActionState> {
  console.log('Sleep action triggered with state:', state, formData)
  const sleep = formData.get('sleep')
  const { error } = moodSchema.safeParse({ sleep })
  const errors: SleepActionState['errors'] = {}
  if (error) {
    error.issues.forEach((issue) => {
      errors[issue.path.join('.')] = { message: issue.message }
    })
  }

  console.log('Sleep logged:', sleep)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        values: state.values,
        errors,
      })
    }, 1000)
  })
}
