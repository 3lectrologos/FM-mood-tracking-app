import { AverageData, Mood, Sleep } from '@/types'
import BgPattern from '@/assets/images/bg-pattern-averages.svg'
import IconVeryHappy from '@/assets/images/icon-very-happy-white.svg'
import IconHappy from '@/assets/images/icon-happy-white.svg'
import IconNeutral from '@/assets/images/icon-neutral-white.svg'
import IconSad from '@/assets/images/icon-sad-white.svg'
import IconVerySad from '@/assets/images/icon-very-sad-white.svg'
import IconSleep from '@/assets/images/icon-sleep.svg'
import IconTrendUp from '@/assets/images/icon-trend-increase.svg'
import IconTrendDown from '@/assets/images/icon-trend-decrease.svg'
import IconTrendSame from '@/assets/images/icon-trend-same.svg'
import { cn, compareValues } from '@/lib/utils'

const defaultMoodTitle = 'Keep tracking!'
const defaultMoodSubtitle = 'Log 5 check-ins to see your average mood.'
const defaultSleepTitle = 'Not enough data yet!'
const defaultSleepSubtitle = 'Track 5 nights to view average sleep.'

export default function AverageBox({ data }: { data: AverageData }) {
  const defaultTitle =
    data.type === 'mood' ? defaultMoodTitle : defaultSleepTitle
  const defaultSubtitle =
    data.type === 'mood' ? defaultMoodSubtitle : defaultSleepSubtitle

  const title =
    data.value === undefined ? (
      defaultTitle
    ) : data.type === 'mood' ? (
      <MoodTitle value={data.value} />
    ) : (
      <SleepTitle value={data.value} />
    )

  const bgColor =
    data.value === undefined
      ? 'bg-blue-100'
      : data.type === 'sleep'
        ? 'bg-blue-600'
        : data.value === 'very sad'
          ? 'bg-red-300'
          : data.value === 'sad'
            ? 'bg-indigo-300'
            : data.value === 'neutral'
              ? 'bg-blue-300'
              : data.value === 'happy'
                ? 'bg-green-300'
                : 'bg-amber-300'

  function calculateMoodTrend(
    previous: Mood | undefined,
    current: Mood | undefined
  ): 'up' | 'down' | 'same' | undefined {
    if (previous === undefined || current === undefined) {
      return undefined
    }
    if (compareValues(previous, current) > 0) {
      return 'up'
    } else if (compareValues(previous, current) < 0) {
      return 'down'
    } else {
      return 'same'
    }
  }

  function calculateSleepTrend(
    previous: Sleep | undefined,
    current: Sleep | undefined
  ): 'up' | 'down' | 'same' | undefined {
    if (previous === undefined || current === undefined) {
      return undefined
    }
    if (compareValues(previous, current) > 0) {
      return 'up'
    } else if (compareValues(previous, current) < 0) {
      return 'down'
    } else {
      return 'same'
    }
  }

  const subtitle =
    data.value === undefined ? (
      defaultSubtitle
    ) : (
      <TrendDisplay
        trend={
          data.type === 'mood'
            ? calculateMoodTrend(data.previous, data.value)
            : calculateSleepTrend(data.previous, data.value)
        }
        className={cn(
          data.type === 'sleep' && 'text-white/70 [&_svg]:fill-neutral-0/70'
        )}
      />
    )

  return (
    <div
      className={cn(
        'relative flex h-[150px] flex-col justify-center gap-y-150 overflow-hidden rounded-16 px-200 py-250 pr-16 tablet:px-300 tablet:py-300 tablet:pr-16',
        bgColor
      )}
    >
      <div className="txt-preset-4">{title}</div>
      <div className="txt-preset-7">{subtitle}</div>
      <div className="absolute -top-9 right-[60px] translate-x-full">
        <BgPattern />
      </div>
    </div>
  )
}

function MoodTitle({ value }: { value: Mood }) {
  const icon =
    value === 'very sad' ? (
      <IconVerySad />
    ) : value === 'sad' ? (
      <IconSad />
    ) : value === 'neutral' ? (
      <IconNeutral />
    ) : value === 'happy' ? (
      <IconHappy />
    ) : (
      <IconVeryHappy />
    )

  return (
    <div className="flex items-center gap-x-150">
      <div className="flex h-6 w-6">{icon}</div>
      <span className="txt-preset-4 capitalize">{value}</span>
    </div>
  )
}

function SleepTitle({ value }: { value: Sleep }) {
  return (
    <div className="flex items-center gap-x-150">
      <IconSleep className="h-6 w-6 fill-neutral-0/70" />
      <span className="txt-preset-4 text-neutral-0 capitalize">
        {`${value} Hours`}
      </span>
    </div>
  )
}

function TrendDisplay({
  trend,
  className,
}: {
  trend: 'up' | 'down' | 'same' | undefined
  className?: string
}) {
  const icon =
    trend === 'up' ? (
      <IconTrendUp />
    ) : trend === 'down' ? (
      <IconTrendDown />
    ) : (
      <IconTrendSame />
    )

  const text =
    trend === 'up'
      ? 'Increase from the previous 5 check-ins'
      : trend === 'down'
        ? 'Decrease from the previous 5 check-ins'
        : 'Same as previous 5 check-ins'

  return (
    <div className={cn('flex gap-x-100', className)}>
      <div className="flex h-[1lh] w-4">{icon}</div>
      <span className="txt-preset-7">
        {trend ? text : 'No trend data available yet'}
      </span>
    </div>
  )
}
