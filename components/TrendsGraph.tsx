import { PartialDataPointWithDate, sleepValues } from '@/types'
import { getMoodIcon } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RefObject, useEffect, useRef, useState } from 'react'

export default function TrendsGraph({
  data,
  ref,
}: {
  data: PartialDataPointWithDate[]
  ref: RefObject<HTMLDivElement | null>
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className="overflow-x-auto" ref={ref}>
      <div className="relative min-w-max pt-1.5 pb-0.5">
        <div className="absolute top-0 left-0 flex w-full flex-col gap-y-[51px] pt-1.5">
          {sleepValues.map((value) => (
            <div key={value} className="h-px w-full bg-blue-100/30" />
          ))}
        </div>
        <div className="flex gap-x-200" ref={containerRef}>
          {data.map((point) => (
            <div
              key={point.date}
              className="flex flex-col justify-end gap-y-150"
            >
              <GraphBar containerRef={ref} {...point} />
              <GraphDate dateString={point.date} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

type GraphBarProps = {
  containerRef: RefObject<HTMLDivElement | null>
} & PartialDataPointWithDate

function GraphBar({ containerRef, mood, sleep, comment, tags }: GraphBarProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    setContainer(containerRef.current)
  }, [containerRef])

  const sleepHeight =
    sleep === undefined
      ? 'h-0'
      : {
          '0-2': 'h-[52px]',
          '3-4': 'h-[104px]',
          '5-6': 'h-[156px]',
          '7-8': 'h-[208px]',
          '9+': 'h-[260px]',
        }[sleep]

  const moodColor =
    mood === undefined
      ? 'bg-neutral-200'
      : {
          'very sad': 'bg-red-300',
          sad: 'bg-violet-300',
          neutral: 'bg-blue-300',
          happy: 'bg-green-300',
          'very happy': 'bg-amber-300',
        }[mood]

  const Icon = mood && getMoodIcon(mood, 'white')
  const ColorIcon = mood && getMoodIcon(mood, 'color')

  return (
    <div className="flex h-[260px] flex-col justify-end">
      <Popover>
        <PopoverTrigger
          className={`relative w-10 ${sleepHeight} ${moodColor} rounded-full`}
        >
          <div className="absolute top-1.5 left-1/2 flex h-[30px] w-[30px] -translate-x-1/2">
            {Icon && <Icon />}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="flex w-[175px] flex-col gap-150 rounded-10 border border-blue-100 p-150 shadow-graph-popover"
          side="left"
          sideOffset={8}
          align="start"
          collisionBoundary={[container]}
          collisionPadding={{ bottom: 44, top: -80 }}
        >
          <div className="flex flex-col gap-075">
            <span className="txt-preset-8 text-neutral-600">Mood</span>
            <div className="flex items-center gap-075">
              {ColorIcon && <ColorIcon className="h-[0.7lh]" />}
              <span className="txt-preset-7 capitalize">{mood}</span>
            </div>
          </div>
          <div className="flex flex-col gap-075">
            <span className="txt-preset-8 text-neutral-600">Sleep</span>
            <span className="txt-preset-7">{sleep} hours</span>
          </div>
          <div className="flex flex-col gap-075">
            <span className="txt-preset-8 text-neutral-600">Reflection</span>
            <span className="txt-preset-9">{comment}</span>
          </div>
          <div className="flex flex-col gap-075">
            <span className="txt-preset-8 text-neutral-600">Tags</span>
            <span className="txt-preset-9 capitalize">{tags?.join(', ')}</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

function GraphDate({ dateString }: { dateString: string }) {
  const date = new Date(dateString)
  const month = date.toLocaleString('default', { month: 'short' })
  const day = date.getDate()

  return (
    <div className="flex flex-col items-center gap-y-075">
      <span className="txt-preset-9 text-neutral-600">{month}</span>
      <span className="txt-preset-8 text-neutral-600">{day}</span>
    </div>
  )
}
