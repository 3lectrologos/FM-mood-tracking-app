import { AverageData } from '@/types'
import BgPattern from '@/assets/images/bg-pattern-averages.svg'

const defaultMoodTitle = 'Keep tracking!'
const defaultMoodSubtitle = 'Log 5 check-ins to see your average mood.'
const defaultSleepTitle = 'Not enough data yet!'
const defaultSleepSubtitle = 'Track 5 nights to view average sleep.'

export default function AverageBox({ data }: { data: AverageData }) {
  const defaultTitle =
    data.type === 'mood' ? defaultMoodTitle : defaultSleepTitle
  const defaultSubtitle =
    data.type === 'mood' ? defaultMoodSubtitle : defaultSleepSubtitle

  return (
    <div className="relative flex h-[150px] flex-col justify-center gap-y-150 overflow-hidden rounded-16 bg-blue-100 px-200 py-250">
      <div className="txt-preset-4">{defaultTitle}</div>
      <div className="txt-preset-7">{defaultSubtitle}</div>
      <div className="absolute -top-9 right-[60px] translate-x-full">
        <BgPattern />
      </div>
    </div>
  )
}
