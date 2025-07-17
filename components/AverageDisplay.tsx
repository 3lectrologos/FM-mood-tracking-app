import { AverageData, AverageMood, AverageSleep } from '@/types'
import AverageBox from '@/components/AverageBox'
import Spacer from '@/components/Spacer'
import DisplayCard from '@/components/DisplayCard'
import { cn } from '@/lib/utils'

export default function AverageDisplay({
  moodData,
  sleepData,
  className,
}: {
  moodData: AverageMood
  sleepData: AverageSleep
  className?: string
}) {
  return (
    <DisplayCard className={cn('desktop:px-300 desktop:py-300', className)}>
      <AverageTitleAndBox data={moodData} />
      <AverageTitleAndBox data={sleepData} />
    </DisplayCard>
  )
}

export function AverageTitleAndBox({ data }: { data: AverageData }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-x-075">
        <span className="txt-preset-5">
          Average {data.type === 'mood' ? 'Mood' : 'Sleep'}
        </span>
        <span className="txt-preset-7 text-neutral-600">
          (Last 5 check-ins)
        </span>
      </div>
      <Spacer className="h-150" />
      <AverageBox data={data} />
    </div>
  )
}
