import Header from '@/components/Header'
import Spacer from '@/components/Spacer'
import MoodLogPrompt from '@/components/MoodLogPrompt'
import AverageDisplay from '@/components/AverageDisplay'

export default function Home() {
  const moodData = { type: 'mood' }
  const sleepData = { type: 'sleep' }

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
