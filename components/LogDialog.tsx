'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import SleepForm from '@/components/forms/SleepForm'
import { ReactNode, useState, useTransition } from 'react'
import MoodForm from '@/components/forms/MoodForm'
import TagsForm from '@/components/forms/TagsForm'
import CommentForm from '@/components/forms/CommentForm'
import {
  commentSchema,
  FormDataType,
  moodSchema,
  sleepSchema,
  tagsSchema,
} from '@/schemas/form'
import { submitFormData } from '@/actions/dialog'
import * as z from 'zod'

const defaultTitle = 'Log your mood'

export const availableFormSteps = [
  {
    key: 'mood',
    schema: moodSchema,
    component: MoodForm,
  },
  {
    key: 'tags',
    schema: tagsSchema,
    component: TagsForm,
  },
  {
    key: 'comment',
    schema: commentSchema,
    component: CommentForm,
  },
  {
    key: 'sleep',
    schema: sleepSchema,
    component: SleepForm,
  },
] as const

export type AvailableSteps = (typeof availableFormSteps)[number]
export type AvailableKeys = AvailableSteps['key']
export type FormStep = {
  [S in AvailableSteps as S['key']]: {
    key: S['key']
    initValues: z.infer<S['schema']>
  }
}[AvailableKeys]

export function findForm<K extends AvailableKeys>(
  formSteps: readonly AvailableSteps[],
  key: K
): Extract<AvailableSteps, { key: K }> | undefined {
  return formSteps.find(
    (s): s is Extract<AvailableSteps, { key: K }> => s.key === key
  )
}

export function findStep<K extends AvailableKeys>(
  formSteps: readonly FormStep[],
  key: K
): Extract<FormStep, { key: K }> | undefined {
  return formSteps.find(
    (s): s is Extract<FormStep, { key: K }> => s.key === key
  )
}

export default function LogDialog({
  children,
  title = defaultTitle,
  formSteps,
}: {
  children: ReactNode
  title?: string
  formSteps: FormStep[]
}) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<(typeof formSteps)[number]['key']>(
    formSteps[0].key
  )
  const [formData, setFormData] = useState<Partial<FormDataType>>(
    {} as Partial<FormDataType>
  )
  const [isPending, startTransition] = useTransition()

  const progress = formSteps.findIndex((s) => s.key === step) + 1
  const formStep = findForm(availableFormSteps, step)
  if (!formStep) {
    throw new Error(`Form step with key "${step}" not found in formSteps`)
  }

  function handleClose() {
    setStep(formSteps[0].key)
  }

  function handleComplete(values: Partial<FormDataType>) {
    const updatedValues = { ...formData, ...values }
    setFormData(updatedValues)
    const nextStepIndex = formSteps.findIndex((s) => s.key === step) + 1
    if (nextStepIndex < formSteps.length) {
      setStep(formSteps[nextStepIndex].key)
    } else {
      startTransition(async () => {
        await submitFormData(updatedValues)
        setOpen(false)
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onAnimationEnd={handleClose}
        className="max-h-[calc(100dvh-40px)] overflow-y-auto rounded-16 bg-light-gradient px-250 py-400 tablet:w-[600px] tablet:px-500 tablet:py-600"
      >
        <DialogHeader className="flex flex-col gap-y-400">
          <DialogTitle className="txt-preset-2">{title}</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>{title}</DialogDescription>
          </VisuallyHidden>
          <Progress step={progress} total={formSteps.length} />
          <formStep.component
            onComplete={handleComplete}
            initValues={findStep(formSteps, step)!.initValues as never}
            isSubmit={progress === formSteps.length}
            isPending={isPending}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

function Progress({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex gap-x-200">
      {Array.from({ length: total }, (_, index) => (
        <div
          key={index}
          className={`h-1.5 w-full rounded-full ${
            index < step ? 'bg-blue-600' : 'bg-blue-200'
          }`}
        />
      ))}
    </div>
  )
}
