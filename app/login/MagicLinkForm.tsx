'use client'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Spacer from '@/components/Spacer'

const magicLinkSchema = z.object({
  name: z.string().min(5, { message: 'Must be at least 5 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
})

export default function MagicLinkForm({
  isPending = false,
  onSubmitAction,
}: {
  isPending?: boolean
  onSubmitAction: (data: z.infer<typeof magicLinkSchema>) => void
}) {
  const form = useForm<z.infer<typeof magicLinkSchema>>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
    },
    resolver: zodResolver(magicLinkSchema),
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitAction)}
        className="flex flex-col"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Spacer className="h-150" />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <Input placeholder="Your Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Spacer className="h-250" />
        <Button
          className="h-12 txt-preset-6"
          type="submit"
          disabled={isPending}
        >
          Send me a link
        </Button>
      </form>
    </Form>
  )
}
