'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Spacer from '@/components/Spacer'
import { useEffect, useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import {
  FaCircleExclamation,
  FaEnvelope,
  FaEnvelopeCircleCheck,
} from 'react-icons/fa6'

const magicLinkSchema = z.object({
  name: z.string().min(5, { message: 'Must be at least 5 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
})

type MagicLinkState = 'initial' | 'success' | 'tryagain' | 'error'
const TRY_AGAIN_TIMEOUT = 10

export default function MagicLinkForm() {
  const [isPending, setIsPending] = useState<boolean>(false)
  const [state, setState] = useState<MagicLinkState>('initial')
  const [timeToTryAgain, setTimeToTryAgain] =
    useState<number>(TRY_AGAIN_TIMEOUT)
  const form = useForm<z.infer<typeof magicLinkSchema>>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
    },
    resolver: zodResolver(magicLinkSchema),
  })

  async function onSubmitAction(values: z.infer<typeof magicLinkSchema>) {
    setIsPending(true)
    const { error } = await authClient.signIn.magicLink({
      email: values.email,
      name: values.name,
      callbackURL: '/',
    })
    if (error) {
      console.error('Error sending magic link:', error)
      setState('error')
      setIsPending(false)
      return
    }
    setState('success')
    setTimeout(() => {
      setState('tryagain')
    }, 3000)
  }

  useEffect(() => {
    if (state !== 'tryagain') {
      return
    }
    setTimeToTryAgain(TRY_AGAIN_TIMEOUT)
    const interval = setInterval(() => {
      setTimeToTryAgain((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setState('tryagain')
          setIsPending(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [state])

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
            <FormItem className="flex flex-col gap-075">
              <FormControl>
                <Input placeholder="Your Name" {...field} aria-label="name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Spacer className="h-150" />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-075">
              <FormControl>
                <Input placeholder="Your Email" {...field} aria-label="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Spacer className="h-250" />
        <Button
          className={cn(
            'relative h-12 gap-200 txt-preset-6',
            state === 'success' &&
              'disabled:bg-emerald-600 disabled:hover:bg-emerald-700',
            state === 'error' && 'bg-red-600 hover:bg-red-700'
          )}
          type="submit"
          disabled={isPending}
        >
          {(state === 'initial' || state === 'tryagain') && <FaEnvelope />}
          {state === 'success' && <FaEnvelopeCircleCheck className="size-5" />}
          {state === 'error' && <FaCircleExclamation />}
          {state === 'initial'
            ? 'Send me a link'
            : state === 'success'
              ? 'Check your email'
              : state === 'tryagain'
                ? 'Send link again'
                : 'Error – try again'}
          {state === 'tryagain' && isPending && timeToTryAgain > 0 && (
            <span className="text-neutral-500 absolute top-1/2 right-300 -translate-y-1/2">
              {timeToTryAgain}
            </span>
          )}
        </Button>
      </form>
    </Form>
  )
}
