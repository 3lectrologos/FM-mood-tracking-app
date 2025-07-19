import { DataPoint, Mood, Sleep } from '@/types'
import DisplayCard from '@/components/DisplayCard'
import { cn, getMoodIcon, getMoodText } from '@/lib/utils'
import IconQuote from '@/assets/images/icon-quote.svg'
import IconSleep from '@/assets/images/icon-sleep.svg'
import IconReflection from '@/assets/images/icon-reflection.svg'

export default function TodayMoodDisplay({
  data,
  className,
}: {
  data: DataPoint
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-250 desktop:flex-row desktop:gap-400',
        className
      )}
    >
      <MoodCard
        className="shrink-0 tablet:h-[340px] desktop:w-[670px]"
        mood={data.mood}
      />
      <div className="flex min-h-[340px] min-w-0 flex-col gap-y-250">
        <SleepCard sleep={data.sleep} />
        <ReflectionCard comment={data.comment} tags={data.tags} />
      </div>
    </div>
  )
}

function MoodCard({ mood, className }: { mood: Mood; className?: string }) {
  const Icon = getMoodIcon(mood, 'color')
  const moodText = `“${getMoodText(mood)}”`

  return (
    <DisplayCard
      className={cn(
        'relative items-center gap-y-400 overflow-hidden px-200 py-400 tablet:items-start tablet:justify-between tablet:px-400',
        className
      )}
    >
      <div className="flex flex-col items-center tablet:items-start">
        <span className="text-center txt-preset-3 text-[32px] text-neutral-900/70">
          {'I’m feeling'}
        </span>
        <span className="text-center txt-preset-2 text-[40px] capitalize">
          {mood}
        </span>
      </div>
      <Icon className="size-[200px] tablet:absolute tablet:top-[50px] tablet:right-10 tablet:size-[320px]" />
      <div className="flex flex-col items-center gap-200 tablet:w-[246px] tablet:items-start tablet:gap-150">
        <IconQuote className="size-6" />
        <span className="truncate text-center txt-preset-6-italic text-pretty tablet:text-start">
          {moodText}
        </span>
      </div>
    </DisplayCard>
  )
}

function SleepCard({ sleep }: { sleep: Sleep }) {
  return (
    <DisplayCard className="gap-y-200 px-250 py-250">
      <div className="flex items-center gap-x-150">
        <IconSleep className="size-[22px] shrink-0 fill-neutral-600" />
        <span className="truncate txt-preset-6 text-neutral-600">Sleep</span>
      </div>
      <span className="truncate txt-preset-3 text-[32px]">{sleep} hours</span>
    </DisplayCard>
  )
}

function ReflectionCard({
  comment,
  tags,
}: {
  comment: string
  tags?: string[]
}) {
  return (
    <DisplayCard className="flex-grow gap-y-200 px-250 py-250">
      <div className="flex items-center gap-x-150">
        <IconReflection className="size-[22px] shrink-0 fill-neutral-600" />
        <span className="truncate txt-preset-6 text-neutral-600">
          Reflection of the day
        </span>
      </div>
      <div className="flex-grow txt-preset-6">{comment}</div>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-x-100">
          {tags.map((tag) => (
            <span
              key={tag}
              className="truncate pr-050 txt-preset-6-italic text-neutral-600 capitalize"
            >
              {`#${tag}`}
            </span>
          ))}
        </div>
      )}
    </DisplayCard>
  )
}
