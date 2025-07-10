'use client'

import { Button } from '@/components/ui/button'
import { Mood, moodValues } from '@/types'
import { ComponentProps, useActionState, useRef } from 'react'
import Form from 'next/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { logSchema } from '@/schemas/log'
import { FormField, FormItem } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn, getMoodIcon } from '@/lib/utils'
import { Label } from '@/components/ui/label'

export type ActionState = {
  errors: Record<string, { message: string }>
  values: { mood: Mood }
}

type ActionType = (
  state: ActionState,
  formData: FormData
) => Promise<ActionState>

const resolver = zodResolver(logSchema)

export default function MoodForm({
  action,
  initValues,
}: {
  action: ActionType
  initValues: { mood: Mood }
}) {
  const [state, formAction, isPending] = useActionState(action, {
    values: initValues,
    errors: {},
  })

  const { control } = useForm({
    mode: 'onBlur',
    values: state.values,
    errors: state.errors,
    resolver,
  })

  return (
    <Form action={formAction} className="flex flex-col gap-y-300">
      <FormField
        name="mood"
        control={control}
        render={({ field }) => (
          <FormItem>
            <label htmlFor="mood" className="txt-preset-3">
              How was your mood today?
            </label>
            <MoodRadioGroup
              value={field.value}
              onValueChange={field.onChange}
              disabled={isPending}
            />
            <input type="hidden" name="mood" value={field.value} />
          </FormItem>
        )}
      />
      <Button variant="large" disabled={isPending}>
        Continue
      </Button>
    </Form>
  )
}

function MoodRadioGroup({ ...props }: ComponentProps<typeof RadioGroup>) {
  const reverseMoodValues = [...moodValues].reverse() as Mood[]

  return (
    <RadioGroup className={cn('flex flex-col gap-y-150')} {...props}>
      {reverseMoodValues.map((mood: Mood) => (
        <MoodRadioItem key={mood} mood={mood} />
      ))}
    </RadioGroup>
  )
}

function MoodRadioItem({ mood }: { mood: Mood }) {
  const radioRef = useRef<HTMLButtonElement>(null)
  const Icon = getMoodIcon(mood)

  return (
    <div
      className="flex cursor-pointer items-center justify-between rounded-10 border-2 border-blue-100 bg-neutral-0 px-250 py-150 has-checked:border-blue-600 has-disabled:has-checked:border-blue-600/50"
      onMouseDown={(e) => {
        e.preventDefault()
        radioRef.current?.click()
      }}
    >
      <div className="flex items-center gap-x-150">
        <RadioGroupItem value={mood} id={mood} ref={radioRef} />
        <Label
          className="cursor-pointer txt-preset-5 capitalize"
          htmlFor={mood}
        >
          {mood}
        </Label>
      </div>
      <div className="flex h-[38px] w-[38px]">
        <Icon />
      </div>
    </div>
  )
}
