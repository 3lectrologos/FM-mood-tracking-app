import { z } from 'zod'
import { moodValues, sleepValues, tagValues } from '@/types'

export const moodSchema = z.object({
  mood: z.enum(moodValues),
})
export type MoodDataType = z.infer<typeof moodSchema>

export const tagsSchema = z.object({
  tags: z
    .array(z.enum(tagValues))
    .max(3, { message: 'You can only select a maximum of 3 tags.' }),
})
export type TagsDataType = z.infer<typeof tagsSchema>

export const sleepSchema = z.object({
  sleep: z.enum(sleepValues),
})
export type SleepDataType = z.infer<typeof sleepSchema>

export const formSchema = z.object({
  ...moodSchema.shape,
  ...tagsSchema.shape,
  ...sleepSchema.shape,
})
export type FormDataType = z.infer<typeof formSchema>
