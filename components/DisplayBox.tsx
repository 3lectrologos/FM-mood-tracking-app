import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export default function DisplayBox({
  className,
  children,
}: {
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-y-300 self-stretch rounded-16 border border-blue-100 bg-neutral-0 px-200 py-250',
        className
      )}
    >
      {children}
    </div>
  )
}
