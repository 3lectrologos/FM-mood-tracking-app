import { z } from 'zod'
import { moodValues } from '@/types'

export const logSchema = z.object({
  mood: z.enum(moodValues),
})

export type LogType = z.infer<typeof logSchema>
