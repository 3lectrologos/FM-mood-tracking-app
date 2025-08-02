'use client'

import { Button } from '@/components/ui/button'
import { FaPenToSquare } from 'react-icons/fa6'
import { cn } from '@/lib/utils'
import LogDialog, { AvailableKeys, FormStep } from '@/components/LogDialog'

export function EditButton({
  className,
  formSteps,
}: {
  className?: string
  formSteps: FormStep<AvailableKeys>[]
}) {
  return (
    <LogDialog formSteps={formSteps} title="Edit">
      <Button className={cn('flex items-end', className)} variant="bare">
        <FaPenToSquare className="size-4 text-neutral-300" />
      </Button>
    </LogDialog>
  )
}
