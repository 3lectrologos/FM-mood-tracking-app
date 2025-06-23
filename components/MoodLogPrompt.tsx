import Spacer from '@/components/Spacer'
import { Button } from '@/components/ui/button'
import { formatDate } from 'date-fns'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import LogMoodDialog from '@/components/LogMoodDialog'

export default function MoodLogPrompt() {
  const name = 'Lisa'
  const date = formatDate(new Date(), 'EEEE, MMMM do, yyyy')
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-y-200">
        <span className="text-[24px]/[130%] font-bold tracking-[-0.3px] text-blue-600">{`Hello, ${name}!`}</span>
        <span className="text-center txt-preset-1">
          How are you feeling today?
        </span>
        <span className="txt-preset-6 text-neutral-600">{date}</span>
      </div>
      <Spacer className="h-600" />
      <Dialog>
        <DialogTrigger asChild>
          <Button>{"Log today's mood"}</Button>
        </DialogTrigger>
        <LogMoodDialog />
      </Dialog>
    </div>
  )
}
