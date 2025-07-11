import { tagValues } from '@/types'
import { TagsDataType, tagsSchema } from '@/schemas/form'
import { FormField, FormItem, FormMessage } from '@/components/ui/form'
import GenericForm from '@/components/forms/GenericForm'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { useRef } from 'react'
import { Label } from '@/components/ui/label'

export default function TagsForm({
  onComplete,
  initValues,
}: {
  onComplete: (values: TagsDataType) => void
  initValues: TagsDataType
}) {
  return (
    <GenericForm
      schema={tagsSchema}
      onComplete={onComplete}
      initValues={initValues}
    >
      {(form) => (
        <FormField
          name="tags"
          control={form.control}
          render={() => (
            <FormItem className="gap-y-300 tablet:gap-y-400">
              <div className="flex flex-col gap-y-075">
                <Label className="txt-preset-3">How did you feel?</Label>
                <Label className="txt-preset-6-regular text-neutral-600">
                  Select up to three tags:
                </Label>
              </div>
              <div className="flex flex-wrap items-center gap-x-200 gap-y-150">
                {tagValues.map((value) => (
                  <FormField
                    key={value}
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <CustomCheckboxItem
                        value={value}
                        checked={field.value?.includes(value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, value])
                            : field.onChange(
                                field.value?.filter((v) => v !== value)
                              )
                        }}
                      />
                    )}
                  />
                ))}
              </div>
              <FormMessage className="-mb-100" />
            </FormItem>
          )}
        />
      )}
    </GenericForm>
  )
}

function CustomCheckboxItem<T extends string>({
  value,
  checked,
  onCheckedChange,
}: {
  value: T
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  const checkboxRef = useRef<HTMLButtonElement>(null)
  const labelRef = useRef<HTMLLabelElement>(null)

  return (
    <FormItem
      className={cn(
        'flex w-fit cursor-pointer flex-row items-center gap-x-100 rounded-10 border-2 border-blue-100 bg-neutral-0 px-200 py-150',
        checked && 'border-blue-600'
      )}
      onMouseDown={(e) => {
        if (
          e.target instanceof HTMLElement &&
          !checkboxRef.current?.contains(e.target)
        ) {
          e.preventDefault()
          checkboxRef.current?.click()
        }
      }}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        ref={checkboxRef}
      />
      <Label
        className="cursor-pointer txt-preset-6-regular capitalize"
        ref={labelRef}
      >
        {value}
      </Label>
    </FormItem>
  )
}
