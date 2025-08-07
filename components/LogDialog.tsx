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
  key: string
  schema: S
  component: ComponentType<FormProps<z.infer<S>>>
}
export type FormDef = FormStepType<z.ZodTypeAny>[]

const availableFormSteps = [
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
] as const satisfies FormDef

export type FormRegistry = {
  mood: typeof availableFormSteps
}

type AvailableSteps<F extends FormDef> = F[number]
type AvailableKeys<F extends FormDef> = AvailableSteps<F>['key']

export type FormInit<F extends FormDef> = {
  [K in keyof F]: {
    key: F[K]['key']
    initValues: z.infer<F[K]['schema']>
    //component: ComponentType<FormProps<z.infer<A[K]['schema']>>>
  }
}[number]

export function findForm<F extends FormDef>(
  formSteps: readonly AvailableSteps<F>[],
  key: AvailableKeys<F>
): Extract<AvailableSteps<F>, { key: AvailableKeys<F> }> | undefined {
  return formSteps.find(
    (s): s is Extract<AvailableSteps<F>, { key: AvailableKeys<F> }> =>
      s.key === key
  )
}

export function findStep<F extends FormDef>(
  formSteps: readonly FormInit<F>[],
  key: AvailableKeys<F>
): Extract<FormInit<F>, { key: AvailableKeys<F> }> | undefined {
  return formSteps.find(
    (s): s is Extract<FormInit<F>, { key: AvailableKeys<F> }> => s.key === key
  )
}

export function createLogDialog<N extends keyof FormRegistry>(
  _name: N,
  formSteps: readonly FormInit<FormRegistry[N]>[]
) {
  return function LogDialogComponent({
    children,
    title,
  }: {
    children: ReactNode
    title: string
  }) {
    return (
      <LogDialog<FormRegistry[N]> title={title} formSteps={formSteps}>
        {children}
      </LogDialog>
    )
  }
}

function LogDialog<F extends FormDef>({
  children,
  title,
  formSteps,
}: {
  children: ReactNode
  title: string
  formSteps: readonly FormInit<F>[]
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
            initValues={findStep(formSteps, step)!.initValues}
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
