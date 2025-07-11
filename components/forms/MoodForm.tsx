import { moodValues } from '@/types'
import { MoodDataType, moodSchema } from '@/schemas/form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { CustomRadioGroup } from '@/components/forms/CustomRadioGroup'
import { getMoodIcon } from '@/lib/utils'
import GenericForm from '@/components/forms/GenericForm'

export default function MoodForm({
  onComplete,
  initValues,
}: {
  onComplete: (values: MoodDataType) => void
  initValues: MoodDataType
}) {
  const moodRadioEntries = [...moodValues].reverse().map((value) => ({
    value,
    icon: getMoodIcon(value),
  }))

  return (
    <GenericForm
      schema={moodSchema}
      onComplete={onComplete}
      initValues={initValues}
    >
      {(form) => (
        <FormField
          name="mood"
          control={form.control}
          render={({ field }) => (
            <FormItem className="gap-y-300 tablet:gap-y-400">
              <FormLabel className="txt-preset-3">
                How was your mood today?
              </FormLabel>
              <FormControl>
                <CustomRadioGroup
                  entries={moodRadioEntries}
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
