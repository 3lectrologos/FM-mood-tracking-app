import { formatDate } from 'date-fns'
import { getZonedToday } from '@/lib/serverUtils'

export default async function MoodLogPrompt({ name }: { name: string }) {
  const today = await getZonedToday()
  const date = formatDate(today, 'EEEE, MMMM do, yyyy')

  return (
    <div className="flex flex-col items-center gap-y-200">
      <span className="text-[24px]/[130%] font-bold tracking-[-0.3px] text-blue-600">{`Hello, ${name}!`}</span>
      <span className="text-center txt-preset-1">
        How are you feeling today?
      </span>
      <span className="txt-preset-6 text-neutral-600">{date}</span>
    </div>
  )
}
