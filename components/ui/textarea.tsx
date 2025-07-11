import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-fixed min-h-16 w-full resize-none rounded-10 border border-neutral-300 bg-neutral-0 px-200 py-150 txt-preset-6-regular text-neutral-600 shadow-input transition-colors selection:bg-neutral-200 placeholder:txt-preset-6-italic placeholder:text-neutral-600 disabled:cursor-not-allowed disabled:opacity-50',
        'outline-none focus:border-neutral-600 focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-[3px]',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
