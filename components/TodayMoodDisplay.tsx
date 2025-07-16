import { DataPoint, Mood, Sleep } from '@/types'
import DisplayCard from '@/components/DisplayCard'
import { getMoodIcon, getMoodText } from '@/lib/utils'
import Spacer from '@/components/Spacer'
import IconQuote from '@/assets/images/icon-quote.svg'
import IconSleep from '@/assets/images/icon-sleep.svg'
import IconReflection from '@/assets/images/icon-reflection.svg'

export default function TodayMoodDisplay({ data }: { data: DataPoint }) {
  return (
    <div className="flex w-full flex-col gap-y-250">
      <MoodCard mood={data.mood} />
      <div className="flex flex-col gap-y-250">
        <SleepCard sleep={data.sleep} />
        <ReflectionCard comment={data.comment} tags={data.tags} />
      </div>
    </div>
  )
}

function MoodCard({ mood }: { mood: Mood }) {
  const Icon = getMoodIcon(mood, 'color')
  const moodText = `“${getMoodText(mood)}”`

  return (
    <DisplayCard className="items-center gap-y-0 px-200 py-400">
      <span className="text-center txt-preset-3 text-[32px] text-neutral-900/70">
        {'I’m feeling'}
      </span>
      <span className="text-center txt-preset-2 text-[40px] capitalize">
        {mood}
      </span>
      <Spacer className="h-400" />
      <Icon className="size-[200px]" />
      <Spacer className="h-400" />
      <IconQuote className="size-6" />
      <Spacer className="h-200" />
      <span className="text-center txt-preset-6-italic text-pretty">
        {moodText}
      </span>
    </DisplayCard>
  )
}

function SleepCard({ sleep }: { sleep: Sleep }) {
  return (
    <DisplayCard className="gap-y-200 px-250 py-250">
      <div className="flex items-center gap-x-150">
        <IconSleep className="size-[22px] shrink-0 fill-neutral-600" />
        <span className="txt-preset-6 text-neutral-600">Sleep</span>
      </div>
      <span className="txt-preset-3 text-[32px]">{sleep} hours</span>
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
    <DisplayCard className="gap-y-200 px-250 py-250">
      <div className="flex items-center gap-x-150">
        <IconReflection className="size-[22px] shrink-0 fill-neutral-600" />
        <span className="txt-preset-6 text-neutral-600">
          Reflection of the day
        </span>
      </div>
      <span className="min-h-20 txt-preset-6">{comment}</span>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-x-150">
          {tags.map((tag) => (
            <span
              key={tag}
              className="txt-preset-6-italic text-neutral-600 capitalize"
            >
              {`#${tag}`}
            </span>
          ))}
        </div>
      )}
    </DisplayCard>
  )
}
