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
import { ComponentType, ReactNode, useState, useTransition } from 'react'
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
import { FormProps } from '@/components/forms/GenericForm'

type FormStepType<S extends z.ZodTypeAny> = {
  schema: S
  component: ComponentType<FormProps<z.infer<S>>>
}
export type FormDef = Record<string, FormStepType<z.ZodTypeAny>>

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

const formRegistry = {
  log: logFormDef,
} as const satisfies Record<string, FormDef>
export type FormRegistry = typeof formRegistry

type StepToInit<F extends FormDef> = {
  [K in keyof F]: F[K] extends { schema: infer S extends z.ZodTypeAny }
    ? { key: K; initValues: z.infer<S> }
    : never
}[keyof F]

export type FormInit<N extends keyof FormRegistry> = StepToInit<FormRegistry[N]>

export function createLogDialog<N extends keyof FormRegistry>(
  name: N,
  formSteps: readonly FormInit<NoInfer<N>>[]
) {
  return function LogDialogComponent({
    children,
    title,
  }: {
    children: ReactNode
    title: string
  }) {
    return (
      <LogDialog name={name} title={title} formSteps={formSteps}>
        {children}
      </LogDialog>
    )
  }
}

function LogDialog<N extends keyof FormRegistry>({
  children,
  title,
  name,
  formSteps,
}: {
  children: ReactNode
  title: string
  name: N
  formSteps: readonly FormInit<NoInfer<N>>[]
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

  // TODO: Don't know how to type this properly
  const FormComponent = formRegistry[name][step].component
  const initValues = formSteps.find((s) => s.key === step)

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
          <FormComponent
            onComplete={handleComplete}
            initValues={initValues}
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
