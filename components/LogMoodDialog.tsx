import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import MoodForm, { ActionState } from '@/components/MoodForm'
import { logSchema } from '@/schemas/log'

async function moodAction(
  state: ActionState,
  formData: FormData
): Promise<ActionState> {
  'use server'
  console.log('Mood action triggered with state:', state, formData)
  const mood = formData.get('mood')
  const { error } = logSchema.safeParse({ mood })
  const errors: ActionState['errors'] = {}
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

export default function LogMoodDialog() {
  return (
    <DialogContent className="rounded-16 bg-light-gradient px-250 py-400 tablet:w-[600px] tablet:px-500 tablet:py-600">
      <DialogHeader className="flex flex-col gap-y-400">
        <DialogTitle className="txt-preset-2">Log your mood</DialogTitle>
        <VisuallyHidden>
          <DialogDescription>Log your mood</DialogDescription>
        </VisuallyHidden>
        <Progress value={1} />
        <MoodForm action={moodAction} initValues={{ mood: 'neutral' }} />
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
