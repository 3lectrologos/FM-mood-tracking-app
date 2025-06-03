import Header from '@/components/Header'
import Spacer from '@/components/Spacer'
import MoodLogPrompt from '@/components/MoodLogPrompt'
import AverageDisplay from '@/components/AverageDisplay'
import { AverageMood, AverageSleep } from '@/types'

export default function Home() {
  const moodData: AverageMood = {
    type: 'mood',
    value: 'neutral',
    previous: 'neutral',
  }
  const sleepData: AverageSleep = {
    type: 'sleep',
    value: '5-6',
    previous: '3-4',
  }

  return (
    <div className="flex min-h-dvh flex-col items-center px-200 pt-400 pb-1000">
      <Header />
      <Spacer className="h-600" />
      <MoodLogPrompt />
      <Spacer className="h-800" />
      <AverageDisplay moodData={moodData} sleepData={sleepData} />
    </div>
  )
}
