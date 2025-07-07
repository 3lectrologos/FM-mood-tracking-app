'use client'

import { Mood, moodValues } from '@/types'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn, getMoodIcon } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { useRef } from 'react'

export default function MoodRadioGroup() {
  const reverseMoodValues = [...moodValues].reverse() as Mood[]

  return (
    <RadioGroup
      className={cn('flex flex-col gap-y-150')}
      defaultValue={reverseMoodValues[0]}
    >
      {reverseMoodValues.map((value) => (
        <MoodRadioItem key={value} mood={value} />
      ))}
    </RadioGroup>
  )
}

function MoodRadioItem({ mood }: { mood: Mood }) {
  const radioRef = useRef<HTMLButtonElement>(null)
  const Icon = getMoodIcon(mood)

  return (
    <div
      className="flex cursor-pointer items-center justify-between rounded-10 border-2 border-blue-100 bg-neutral-0 px-250 py-150 has-checked:border-blue-600"
      onMouseDown={(e) => {
        e.preventDefault()
        radioRef.current?.click()
      }}
    >
      <div className="flex items-center gap-x-150">
        <RadioGroupItem value={mood} id={mood} ref={radioRef} />
        <Label
          className="cursor-pointer txt-preset-5 capitalize"
          htmlFor={mood}
        >
          {mood}
        </Label>
      </div>
      <div className="flex h-[38px] w-[38px]">
        <Icon />
      </div>
    </div>
  )
}
