'use client'

import { Button } from '@/components/ui/button'
import { FaPenToSquare } from 'react-icons/fa6'
import { cn } from '@/lib/utils'
import { createLogDialog, FormInit, FormRegistry } from '@/components/LogDialog'

export function createEditButton<N extends keyof FormRegistry>(
  name: N,
  formSteps: readonly FormInit<N>[]
) {
  return function EditButtonComponent({
    className,
    title,
  }: {
    className?: string
    title: string
  }) {
    return (
      <EditButton
        className={className}
        name={name}
        formSteps={formSteps}
        title={title}
      />
    )
  }
}

function EditButton<N extends keyof FormRegistry>({
  name,
  className,
  formSteps,
  title,
}: {
  name: N
  className?: string
  formSteps: readonly FormInit<N>[]
  title: string
}) {
  const LogDialog = createLogDialog(name, formSteps)

  return (
    <LogDialog title={title}>
      <Button className={cn('flex items-end', className)} variant="bare">
        <FaPenToSquare className="size-3.5 text-neutral-300" />
      </Button>
    </LogDialog>
  )
}
