import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import MoodForm, { MoodActionState } from '@/components/MoodForm'
import { moodSchema } from '@/schemas/log'
import SleepForm, { SleepActionState } from '@/components/SleepForm'

async function moodAction(
  state: MoodActionState,
  formData: FormData
): Promise<MoodActionState> {
  'use server'
  console.log('Mood action triggered with state:', state, formData)
  const mood = formData.get('mood')
  const { error } = moodSchema.safeParse({ mood })
  const errors: MoodActionState['errors'] = {}
  if (error) {
    error.issues.forEach((issue) => {
      errors[issue.path.join('.')] = { message: issue.message }
    })
  }

  console.log('Mood logged:', mood)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        values: state.values,
        errors,
      })
    }, 1000)
  })
}

async function sleepAction(
  state: SleepActionState,
  formData: FormData
): Promise<SleepActionState> {
  'use server'
  console.log('Sleep action triggered with state:', state, formData)
  const sleep = formData.get('sleep')
  const { error } = moodSchema.safeParse({ sleep })
  const errors: SleepActionState['errors'] = {}
  if (error) {
    error.issues.forEach((issue) => {
      errors[issue.path.join('.')] = { message: issue.message }
    })
  }

  console.log('Sleep logged:', sleep)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        values: state.values,
        errors,
      })
    }, 1000)
  })
}

export default function LogDialog() {
  return (
    <DialogContent className="rounded-16 bg-light-gradient px-250 py-400 tablet:w-[600px] tablet:px-500 tablet:py-600">
      <DialogHeader className="flex flex-col gap-y-400">
        <DialogTitle className="txt-preset-2">Log your mood</DialogTitle>
        <VisuallyHidden>
          <DialogDescription>Log your mood</DialogDescription>
        </VisuallyHidden>
        <Progress value={1} />
        {/*<MoodForm action={moodAction} initValues={{ mood: 'neutral' }} />*/}
        <SleepForm action={sleepAction} initValues={{ sleep: '7-8' }} />
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
