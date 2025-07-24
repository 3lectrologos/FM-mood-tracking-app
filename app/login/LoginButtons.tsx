'use client'

import { FaGithub, FaGoogle } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useState, useTransition } from 'react'
import { PulseLoader } from 'react-spinners'
import { cn } from '@/lib/utils'

export function LoginButtons({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition()
  const [pendingProvider, setPendingProvider] = useState<string | null>(null)

  const spinner = <PulseLoader color="#FFF" size={8} margin={2} />

  // TODO: Check how to handle login errors.
  async function handleLogin(provider: string) {
    if (isPending) {
      return
    }
    setPendingProvider(provider)
    startTransition(async () => {
      await authClient.signIn.social({
        provider,
      })
      startTransition(() => {
        setPendingProvider(null)
      })
    })
  }

  return (
    <div className={cn('flex flex-col gap-250', className)}>
      <Button
        className="h-12 gap-200 px-0 py-0 txt-preset-6"
        onClick={() => handleLogin('google')}
        disabled={isPending}
      >
        {pendingProvider === 'google' ? (
          spinner
        ) : (
          <>
            <FaGoogle size={20} />
            Log in with Google
          </>
        )}
      </Button>
      <Button
        className="h-12 gap-200 px-0 py-0 txt-preset-6"
        onClick={() => handleLogin('github')}
        disabled={isPending}
      >
        {pendingProvider === 'github' ? (
          spinner
        ) : (
          <>
            <FaGithub size={20} />
            Log in with GitHub
          </>
        )}
      </Button>
    </div>
  )
}
