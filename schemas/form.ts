import { z } from 'zod'
import { moodValues, sleepValues } from '@/types'

export const moodSchema = z.object({
  mood: z.enum(moodValues),
})

export type MoodDataType = z.infer<typeof moodSchema>

export const sleepSchema = z.object({
  sleep: z.enum(sleepValues),
})

export type SleepDataType = z.infer<typeof sleepSchema>

export const formSchema = z.object({
  ...moodSchema.shape,
  ...sleepSchema.shape,
})

export type FormDataType = z.infer<typeof formSchema>
