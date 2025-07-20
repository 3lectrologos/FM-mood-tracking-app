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
import { ComponentType, useState, useTransition } from 'react'
import MoodForm from '@/components/forms/MoodForm'
import { Button } from '@/components/ui/button'
import TagsForm from '@/components/forms/TagsForm'
import CommentForm from '@/components/forms/CommentForm'
import {
  commentSchema,
  FormDataType,
  moodSchema,
  sleepSchema,
  tagsSchema,
} from '@/schemas/form'
import { Mood, Sleep } from '@/types'
import { FormProps } from '@/components/forms/GenericForm'
import { z } from 'zod'
import { submitFormData } from '@/actions/dialog'

type DialogStep<T extends z.ZodTypeAny> = {
  name: string
  component: ComponentType<FormProps<T>>
}

const dialogSteps = [
  {
    name: 'mood',
    component: MoodForm,
  },
  {
    name: 'tags',
    component: TagsForm,
  },
  {
    name: 'comment',
    component: CommentForm,
  },
  {
    name: 'sleep',
    component: SleepForm,
  },
] as const satisfies readonly [
  DialogStep<typeof moodSchema>,
  DialogStep<typeof tagsSchema>,
  DialogStep<typeof commentSchema>,
  DialogStep<typeof sleepSchema>,
]

const initValues = {
  mood: 'neutral' as Mood,
  tags: [],
  comment: '',
  sleep: '7-8' as Sleep,
}

export default function LogDialog() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<(typeof dialogSteps)[number]['name']>(
    dialogSteps[0].name
  )
  const [formData, setFormData] = useState<FormDataType>(initValues)
  const [isPending, startTransition] = useTransition()

  const progress = dialogSteps.findIndex((s) => s.name === step) + 1
  const StepComponent = dialogSteps.find((s) => s.name === step)?.component

  function handleClose() {
    setStep(dialogSteps[0].name)
  }

  function handleComplete(values: Partial<FormDataType>) {
    const updatedValues = { ...formData, ...values }
    setFormData(updatedValues)
    const nextStepIndex = dialogSteps.findIndex((s) => s.name === step) + 1
    if (nextStepIndex < dialogSteps.length) {
      setStep(dialogSteps[nextStepIndex].name)
    } else {
      startTransition(async () => {
        await submitFormData(updatedValues)
        setOpen(false)
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{"Log today's mood"}</Button>
      </DialogTrigger>
      <DialogContent
        onAnimationEnd={handleClose}
        className="max-h-[calc(100dvh-40px)] overflow-y-auto rounded-16 bg-light-gradient px-250 py-400 tablet:w-[600px] tablet:px-500 tablet:py-600"
      >
        <DialogHeader className="flex flex-col gap-y-400">
          <DialogTitle className="txt-preset-2">Log your mood</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Log your mood</DialogDescription>
          </VisuallyHidden>
          <Progress step={progress} total={dialogSteps.length} />
          {StepComponent && (
            <StepComponent
              onComplete={handleComplete}
              initValues={initValues}
              isSubmit={progress === dialogSteps.length}
              isPending={isPending}
            />
          )}
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
