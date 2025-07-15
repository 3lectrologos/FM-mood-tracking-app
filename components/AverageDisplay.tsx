import { AverageData, AverageMood, AverageSleep } from '@/types'
import AverageBox from '@/components/AverageBox'
import Spacer from '@/components/Spacer'
import DisplayCard from '@/components/DisplayCard'

export default function AverageDisplay({
  moodData,
  sleepData,
}: {
  moodData: AverageMood
  sleepData: AverageSleep
}) {
  return (
    <DisplayCard>
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
