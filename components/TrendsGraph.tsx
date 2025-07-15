import { PartialDataPointWithDate, Mood, Sleep } from '@/types'
import { getMoodIcon } from '@/lib/utils'

export default function TrendsGraph({
  data,
}: {
  data: PartialDataPointWithDate[]
}) {
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

function GraphBar({ sleep, mood }: { sleep?: Sleep; mood?: Mood }) {
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

  return (
    <div className="flex h-[260px] flex-col justify-end">
      <div className={`relative w-10 ${sleepHeight} ${moodColor} rounded-full`}>
        <div className="absolute top-1.5 left-1/2 flex h-[30px] w-[30px] -translate-x-1/2">
          {Icon && <Icon />}
        </div>
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
