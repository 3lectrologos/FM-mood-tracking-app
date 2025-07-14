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

export const MAX_COMMENT_LENGTH = 150
export const commentSchema = z.object({
  comment: z
    .string()
    .min(1, {
      message: 'Please write a few words about your day before continuing.',
    })
    .max(MAX_COMMENT_LENGTH, {
      message: `Your thoughts must be ${MAX_COMMENT_LENGTH} characters or less.`,
    }),
})
export type CommentDataType = z.infer<typeof commentSchema>

export const sleepSchema = z.object({
  sleep: z.enum(sleepValues),
})
export type SleepDataType = z.infer<typeof sleepSchema>

export const formSchema = z.object({
  ...moodSchema.shape,
  ...tagsSchema.shape,
  ...commentSchema.shape,
  ...sleepSchema.shape,
})
export type FormDataType = z.infer<typeof formSchema>
