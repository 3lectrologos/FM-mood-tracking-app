'use client'

import { Button } from '@/components/ui/button'
import LogoutIcon from '@/assets/images/icon-logout.svg'
import { logout } from '@/actions/auth'
import { useTransition } from 'react'

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      className="w-full items-center justify-start gap-125"
      variant="bare"
      onClick={() => startTransition(() => logout())}
      disabled={isPending}
    >
      <LogoutIcon className="size-4 shrink-0" />
      <span className="truncate txt-preset-7">Logout</span>
    </Button>
  )
}
