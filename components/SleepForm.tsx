'use client'

import { Button } from '@/components/ui/button'
import { Sleep, sleepValues } from '@/types'
import { useActionState } from 'react'
import Form from 'next/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormField, FormItem } from '@/components/ui/form'
import { CustomRadioGroup } from '@/components/CustomRadioGroup'
import { sleepSchema } from '@/schemas/log'

export type SleepActionState = {
  errors: Record<string, { message: string }>
  values: { sleep: Sleep }
}

type SleepActionType = (
  state: SleepActionState,
  formData: FormData
) => Promise<SleepActionState>

const resolver = zodResolver(sleepSchema)

export default function SleepForm({
  action,
  initValues,
}: {
  action: SleepActionType
  initValues: { sleep: Sleep }
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

  const sleepRadioEntries = [...sleepValues].reverse().map((value) => ({
    value,
    label: `${value} hours`,
  }))

  return (
    <Form action={formAction} className="flex flex-col gap-y-300">
      <FormField
        name="sleep"
        control={control}
        render={({ field }) => (
          <FormItem>
            <label htmlFor="sleep" className="txt-preset-3">
              How many hours did you sleep last night?
            </label>
            <CustomRadioGroup
              entries={sleepRadioEntries}
              value={field.value}
              onValueChange={field.onChange}
              disabled={isPending}
            />
            <input type="hidden" name="sleep" value={field.value} />
          </FormItem>
        )}
      />
      <Button variant="large" disabled={isPending}>
        Continue
      </Button>
    </Form>
  )
}
