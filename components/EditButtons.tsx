'use client'

import { Button } from '@/components/ui/button'
import { FaPenToSquare } from 'react-icons/fa6'
import { cn } from '@/lib/utils'
import LogDialog, { FormStep } from '@/components/LogDialog'

export function EditButton({
  className,
  formSteps,
  title = 'Edit',
}: {
  className?: string
  formSteps: FormStep[]
  title?: string
}) {
  return (
    <LogDialog formSteps={formSteps} title={title}>
      <Button className={cn('flex items-end', className)} variant="bare">
        <FaPenToSquare className="size-3.5 text-neutral-300" />
      </Button>
    </LogDialog>
  )
}
