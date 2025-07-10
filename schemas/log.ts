import { z } from 'zod'
import { moodValues, sleepValues } from '@/types'

export const moodSchema = z.object({
  mood: z.enum(moodValues),
})

export type MoodSchemaType = z.infer<typeof moodSchema>

export const sleepSchema = z.object({
  sleep: z.enum(sleepValues),
})

export type SleepSchemaType = z.infer<typeof sleepSchema>
