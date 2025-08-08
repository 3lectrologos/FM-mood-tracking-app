import { z } from 'zod'
import { FormDef, moodValues, sleepValues, tagValues } from '@/types'
import MoodForm from '@/components/forms/MoodForm'
import TagsForm from '@/components/forms/TagsForm'
import CommentForm from '@/components/forms/CommentForm'
import SleepForm from '@/components/forms/SleepForm'

export const moodSchema = z.object({
  mood: z.enum(moodValues),
})

export const tagsSchema = z.object({
  tags: z
    .array(z.enum(tagValues))
    .max(3, { message: 'You can only select a maximum of 3 tags.' }),
})

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

export const sleepSchema = z.object({
  sleep: z.enum(sleepValues),
})

export const formSchema = z.object({
  ...moodSchema.shape,
  ...tagsSchema.shape,
  ...commentSchema.shape,
  ...sleepSchema.shape,
})
export type FormDataType = z.infer<typeof formSchema>

export type DataPoint = {
  date: string
} & FormDataType

export type PartialDataPointWithDate = {
  date: string
} & Partial<DataPoint>

const logFormDef = {
  mood: {
    schema: moodSchema,
    component: MoodForm,
  },
  tags: {
    schema: tagsSchema,
    component: TagsForm,
  },
  comment: {
    schema: commentSchema,
    component: CommentForm,
  },
  sleep: {
    schema: sleepSchema,
    component: SleepForm,
  },
} as const satisfies FormDef

export const formRegistry = {
  log: logFormDef,
} as const satisfies Record<string, FormDef>
export type FormRegistry = typeof formRegistry
