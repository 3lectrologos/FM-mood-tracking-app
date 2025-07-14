import { useForm, UseFormReturn } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export type GenericFormProps<T extends z.ZodTypeAny> = {
  schema: T
  onComplete: (values: z.infer<T>) => void
  initValues: z.infer<T>
  children: (form: UseFormReturn<z.infer<T>>) => ReactNode
  isSubmit?: boolean
  isPending?: boolean
}

export type FormProps<T extends z.ZodTypeAny> = Omit<
  GenericFormProps<T>,
  'schema' | 'children'
>

export default function GenericForm<T extends z.ZodTypeAny>({
  schema,
  onComplete,
  initValues,
  children,
  isSubmit = false,
  isPending = false,
}: GenericFormProps<T>) {
  const form = useForm<z.infer<T>>({
    mode: 'onSubmit',
    defaultValues: initValues,
    resolver: zodResolver(schema),
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onComplete)}
        className="flex flex-col gap-y-300 tablet:gap-y-400"
      >
        {children(form)}
        <Button variant="large" type="submit" disabled={isPending}>
          {isSubmit ? 'Submit' : 'Continue'}
        </Button>
      </form>
    </Form>
  )
}
