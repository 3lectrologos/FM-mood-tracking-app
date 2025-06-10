import IconVeryHappy from '@/assets/images/icon-very-happy-white.svg'
import IconHappy from '@/assets/images/icon-happy-white.svg'
import IconNeutral from '@/assets/images/icon-neutral-white.svg'
import IconSad from '@/assets/images/icon-sad-white.svg'
import IconVerySad from '@/assets/images/icon-very-sad-white.svg'
import IconSleep from '@/assets/images/icon-sleep.svg'
import { DataPoint, sleepValues } from '@/types'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export default function TrendsDisplay({ data }: { data: DataPoint[] }) {
  return (
    <div className="flex flex-col gap-y-300 self-stretch rounded-16 border border-blue-100 bg-neutral-0 px-200 py-250">
      <span className="txt-preset-3">Mood and sleep trends</span>
      <div className="flex gap-x-200">
        <div className="z-10 flex flex-col gap-y-[39px] bg-neutral-0">
          {sleepValues
            .slice()
            .reverse()
            .map((value) => (
              <div key={value} className="flex items-center gap-x-075">
                <IconSleep className="h-2.5 w-2.5 fill-neutral-600" />
                <span className="txt-preset-9 text-neutral-600">{`${value} hours`}</span>
              </div>
            ))}
        </div>
        <ScrollArea className="w-1 flex-1 pt-1.5">
          <div className="absolute top-0 left-0 flex w-full flex-col gap-y-[51px] pt-1.5">
            {sleepValues.map((value) => (
              <div key={value} className="h-px w-full bg-blue-100/30" />
            ))}
          </div>
          <TrendsGraph data={data} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}

function TrendsGraph({ data }: { data: DataPoint[] }) {
  return (
    <div className="flex gap-x-200">
      {data.map((point) => (
        <div key={point.date} className="flex flex-col justify-end gap-y-150">
          <GraphBar {...point} />
          <GraphDate dateString={point.date} />
        </div>
      ))}
    </div>
  )
}

function GraphBar({ sleep, mood }: DataPoint) {
  const sleepHeight = {
    '0-2': 'h-[52px]',
    '3-4': 'h-[104px]',
    '5-6': 'h-[156px]',
    '7-8': 'h-[208px]',
    '9+': 'h-[260px]',
  }[sleep]

  const moodColor = {
    'very sad': 'bg-red-300',
    sad: 'bg-violet-300',
    neutral: 'bg-blue-300',
    happy: 'bg-green-300',
    'very happy': 'bg-amber-300',
  }[mood]

  const icon = {
    'very sad': <IconVerySad />,
    sad: <IconSad />,
    neutral: <IconNeutral />,
    happy: <IconHappy />,
    'very happy': <IconVeryHappy />,
  }[mood]

  return (
    <div className={`relative w-10 ${sleepHeight} ${moodColor} rounded-full`}>
      <div className="absolute top-1.5 left-1/2 flex h-[30px] w-[30px] -translate-x-1/2">
        {icon}
      </div>
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
