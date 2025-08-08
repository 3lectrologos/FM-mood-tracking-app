import { Button } from '@/components/ui/button'
import { FaPenToSquare } from 'react-icons/fa6'
import { cn } from '@/lib/utils'
import {
  FormInit,
  FormRegistry,
  GenericDialog,
} from '@/components/GenericDialog'

export default function EditButton<N extends keyof FormRegistry>({
  name,
  className,
  formSteps,
  title,
}: {
  name: N
  className?: string
  formSteps: readonly FormInit<NoInfer<N>>[]
  title: string
}) {
  return (
    <GenericDialog name={name} formSteps={formSteps} title={title}>
      <Button className={cn('flex items-end', className)} variant="bare">
        <FaPenToSquare className="size-3.5 text-neutral-300" />
      </Button>
    </GenericDialog>
  )
}
