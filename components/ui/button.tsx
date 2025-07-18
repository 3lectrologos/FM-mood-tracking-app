import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none shrink-0 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default:
          'txt-preset-5 bg-blue-600 text-neutral-0 hover:bg-blue-700 disabled:bg-blue-200 outline-none focus-visible:ring-blue-700 focus-visible:ring-2 focus-visible:ring-offset-[3px] px-400 py-200 rounded-10',
        large:
          'txt-preset-4 bg-blue-600 text-neutral-0 hover:bg-blue-700 disabled:bg-blue-200 outline-none focus-visible:ring-blue-700 focus-visible:ring-2 focus-visible:ring-offset-[3px] px-400 py-200 rounded-10',
        bare: 'txt-preset-7 bg-transparent text-neutral-900 hover:bg-transparent outline-none focus-visible:ring-blue-700 focus-visible:ring-2 focus-visible:ring-offset-[3px]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Button({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
