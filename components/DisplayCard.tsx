import { ReactNode, Ref } from 'react'
import { cn } from '@/lib/utils'

export default function DisplayCard({
  ref,
  className,
  children,
}: {
  ref?: Ref<HTMLDivElement>
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-y-300 rounded-16 border border-blue-100 bg-neutral-0 px-200 py-250',
        className
      )}
      ref={ref}
    >
      {children}
    </div>
  )
}
