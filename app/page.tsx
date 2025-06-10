import Header from '@/components/Header'
import Spacer from '@/components/Spacer'
import MoodLogPrompt from '@/components/MoodLogPrompt'
import AverageDisplay from '@/components/AverageDisplay'
import { AverageMood, AverageSleep, DataPoint } from '@/types'
import TrendsDisplay from '@/components/TrendsDisplay'

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

  const data: DataPoint[] = [
    { date: '2025-04-11', mood: 'sad', sleep: '3-4' },
    { date: '2025-04-12', mood: 'neutral', sleep: '7-8' },
    { date: '2025-04-13', mood: 'happy', sleep: '7-8' },
    { date: '2025-04-14', mood: 'very sad', sleep: '3-4' },
    { date: '2025-04-15', mood: 'very happy', sleep: '9+' },
  ]

  return (
    <div className="flex min-h-dvh flex-col items-center px-200 pt-400 pb-1000">
      <Header />
      <Spacer className="h-600" />
      <MoodLogPrompt />
      <Spacer className="h-800" />
      <AverageDisplay moodData={moodData} sleepData={sleepData} />
      <Spacer className="h-400" />
      <TrendsDisplay data={data} />
    </div>
  )
}
