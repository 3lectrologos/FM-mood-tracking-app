import { commentSchema, MAX_COMMENT_LENGTH } from '@/schemas/form'
import { FormField, FormItem, FormMessage } from '@/components/ui/form'
import GenericForm, { FormProps } from '@/components/forms/GenericForm'
import { Label } from '@/components/ui/label'
import { ComponentProps } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export default function CommentForm({
  ...props
}: FormProps<typeof commentSchema>) {
  return (
    <GenericForm schema={commentSchema} {...props}>
      {(form) => (
        <FormField
          name="comment"
          control={form.control}
          render={({ field }) => (
            <FormItem className="gap-y-300 tablet:gap-y-400">
              <Label className="txt-preset-3">Write about your day …</Label>
              <CustomInput
                hasError={!!form.formState.errors.comment}
                {...field}
              />
              <FormMessage className="-mb-100" />
            </FormItem>
          )}
        />
      )}
    </GenericForm>
  )
}

type CustomInputProps = {
  value?: string
  hasError?: boolean
} & Omit<ComponentProps<typeof Textarea>, 'value'>

function CustomInput({ value, hasError, ...props }: CustomInputProps) {
  return (
    <div className="flex flex-col gap-y-100">
      <Textarea
        className="h-[150px]"
        placeholder="Today, I felt …"
        {...props}
      />
      <span
        className={cn(
          'text-right txt-preset-8 text-neutral-600',
          hasError && 'text-red-700'
        )}
      >
        {value?.length ?? 0}/{MAX_COMMENT_LENGTH}
      </span>
    </div>
  )
}
