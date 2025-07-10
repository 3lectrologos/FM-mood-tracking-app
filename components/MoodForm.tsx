import { Button } from '@/components/ui/button'
import { Mood, moodValues } from '@/types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { moodSchema } from '@/schemas/log'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { CustomRadioGroup } from '@/components/CustomRadioGroup'
import { getMoodIcon } from '@/lib/utils'

const resolver = zodResolver(moodSchema)

export default function MoodForm({
  onComplete,
  initValues,
}: {
  onComplete: (data: { mood: Mood }) => void
  initValues: { mood: Mood }
}) {
  const form = useForm({
    mode: 'onBlur',
    defaultValues: initValues,
    resolver,
  })

  const moodRadioEntries = [...moodValues].reverse().map((value) => ({
    value,
    icon: getMoodIcon(value),
  }))

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onComplete(data))}
        className="flex flex-col gap-y-300"
      >
        <FormField
          name="mood"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <label htmlFor="mood" className="txt-preset-3">
                How was your mood today?
              </label>
              <CustomRadioGroup
                entries={moodRadioEntries}
                value={field.value}
                onValueChange={field.onChange}
              />
              <input type="hidden" name="mood" value={field.value} />
            </FormItem>
          )}
        />
        <Button variant="large" type="submit">
          Continue
        </Button>
      </form>
    </Form>
  )
}
