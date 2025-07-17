import { ComponentProps, createElement, FunctionComponent, useRef } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

type CustomRadioGroupProps<T extends string> = {
  entries: {
    value: T
    label?: string
    icon?: FunctionComponent
  }[]
} & ComponentProps<typeof RadioGroup>

export function CustomRadioGroup<T extends string>({
  entries,
  ...props
}: CustomRadioGroupProps<T>) {
  return (
    <RadioGroup className={cn('flex flex-col gap-y-150')} {...props}>
      {entries.map(({ value, label, icon }) => (
        <CustomRadioItem key={value} value={value} label={label} icon={icon} />
      ))}
    </RadioGroup>
  )
}

function CustomRadioItem<T extends string>({
  value,
  label,
  icon,
}: {
  value: T
  label?: string
  icon?: FunctionComponent
}) {
  const radioRef = useRef<HTMLButtonElement>(null)

  return (
    <div
      className="box-border flex min-h-[60px] cursor-pointer items-center justify-between rounded-10 border-2 border-blue-100 bg-neutral-0 px-250 py-125 has-checked:border-blue-600 has-disabled:has-checked:border-blue-600/50"
      onMouseDown={(e) => {
        e.preventDefault()
        radioRef.current?.click()
      }}
    >
      <div className="flex items-center gap-x-150">
        <RadioGroupItem value={value} id={value} ref={radioRef} />
        <Label
          className="cursor-pointer txt-preset-5 capitalize"
          htmlFor={value}
        >
          {label || value}
        </Label>
      </div>
      {icon && (
        <div className="flex h-[38px] w-[38px]">{createElement(icon)}</div>
      )}
    </div>
  )
}
