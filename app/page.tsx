import Header from '@/components/Header'
import Spacer from '@/components/Spacer'
import MoodLogPrompt from '@/components/MoodLogPrompt'
import AverageDisplay from '@/components/AverageDisplay'
import { AverageMood, AverageSleep, DataPoint } from '@/types'
import TrendsDisplay from '@/components/TrendsDisplay'
import { format, subDays } from 'date-fns'

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
    { date: '2025-06-26', mood: 'very sad', sleep: '0-2' },
    { date: '2025-06-28', mood: 'sad', sleep: '3-4' },
    { date: '2025-07-01', mood: 'neutral', sleep: '7-8' },
    { date: '2025-07-05', mood: 'happy', sleep: '7-8' },
    { date: '2025-07-06', mood: 'very sad', sleep: '3-4' },
    { date: '2025-07-07', mood: 'very happy', sleep: '9+' },
  ]

  const numRecentDays = 14
  const today = new Date()
  const recentData = Array.from({ length: numRecentDays }, (_, i) =>
    subDays(today, numRecentDays - 1 - i)
  )
    .map((date) => format(date, 'yyyy-MM-dd'))
    .map((date) => {
      const point = data.find((d) => d.date === date)
      return point || { date, mood: undefined, sleep: undefined }
    })

  return (
    <div className="flex min-h-dvh flex-col items-center px-200 pt-400 pb-1000">
      <Header />
      <Spacer className="h-600" />
      <MoodLogPrompt />
      <Spacer className="h-800" />
      <AverageDisplay moodData={moodData} sleepData={sleepData} />
      <Spacer className="h-400" />
      <TrendsDisplay data={recentData} />
    </div>
  )
}
