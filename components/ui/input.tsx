import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex w-full min-w-0 rounded-10 border border-neutral-300 bg-neutral-0 px-200 py-150 txt-preset-6-regular text-neutral-900 shadow-xs transition-[color,box-shadow] selection:bg-neutral-200 selection:text-neutral-600 placeholder:text-neutral-600 hover:border-neutral-600 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'outline-none focus:border-neutral-600 focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-[3px]',
        'invalid:border-red-700',
        className
      )}
      {...props}
    />
  )
}

export { Input }
