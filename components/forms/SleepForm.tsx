'use client'

import { sleepValues } from '@/types'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { CustomRadioGroup } from '@/components/forms/CustomRadioGroup'
import { sleepSchema } from '@/schemas/form'
import GenericForm, { FormProps } from '@/components/forms/GenericForm'

export default function SleepForm({ ...props }: FormProps<typeof sleepSchema>) {
  const sleepRadioEntries = [...sleepValues].reverse().map((value) => ({
    value,
    label: `${value} hours`,
  }))

  return (
    <GenericForm schema={sleepSchema} {...props}>
      {(form) => (
        <FormField
          name="sleep"
          control={form.control}
          render={({ field }) => (
            <FormItem className="gap-y-300 tablet:gap-y-400">
              <FormLabel className="txt-preset-3">
                How many hours did you sleep last night?
              </FormLabel>
              <FormControl>
                <CustomRadioGroup
                  entries={sleepRadioEntries}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </GenericForm>
  )
}
