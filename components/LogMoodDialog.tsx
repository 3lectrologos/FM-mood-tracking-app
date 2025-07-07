import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Button } from '@/components/ui/button'
import MoodRadioGroup from '@/components/MoodRadioGroup'

export default function LogMoodDialog() {
  return (
    <DialogContent className="rounded-16 bg-light-gradient px-250 py-400 tablet:w-[600px] tablet:px-500 tablet:py-600">
      <DialogHeader className="flex flex-col gap-y-400">
        <DialogTitle className="txt-preset-2">Log your mood</DialogTitle>
        <VisuallyHidden>
          <DialogDescription>Log your mood</DialogDescription>
        </VisuallyHidden>
        <Progress value={1} />
        <MoodForm />
      </DialogHeader>
    </DialogContent>
  )
}

function Progress({ value }: { value: number }) {
  return (
    <div className="flex gap-x-200">
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className={`h-1.5 w-full rounded-full ${
            index < value ? 'bg-blue-600' : 'bg-blue-200'
          }`}
        />
      ))}
    </div>
  )
}

function MoodForm() {
  return (
    <form className="flex flex-col gap-y-300">
      <label htmlFor="mood" className="txt-preset-3">
        How was your mood today?
      </label>
      <MoodRadioGroup />
      <Button variant="large">Continue</Button>
    </form>
  )
}
