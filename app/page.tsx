import Header from '@/components/Header'
import Spacer from '@/components/Spacer'
import MoodLogPrompt from '@/components/MoodLogPrompt'
import AverageDisplay from '@/components/AverageDisplay'
import {
  AverageMood,
  AverageSleep,
  DataPoint,
  PartialDataPointWithDate,
} from '@/types'
import TrendsDisplay from '@/components/TrendsDisplay'
import { format, subDays } from 'date-fns'
import TodayMoodDisplay from '@/components/TodayMoodDisplay'
import LogDialog from '@/components/LogDialog'
import { getTodayData } from '@/drizzle/queries'

export default async function Home() {
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

  // TODO: Refactor DataPoint type to be an extension of the zod form schema
  const data: DataPoint[] = [
    //{ date: '2025-06-28', mood: 'sad', sleep: '3-4' },
    //{ date: '2025-07-01', mood: 'neutral', sleep: '7-8' },
    //{ date: '2025-07-05', mood: 'happy', sleep: '7-8' },
    //{ date: '2025-07-06', mood: 'very sad', sleep: '3-4' },
    {
      date: '2025-07-13',
      mood: 'very sad',
      sleep: '0-2',
      comment: 'Feeling overwhelmed with work.',
      tags: [],
    },
    {
      date: '2025-07-16',
      mood: 'very happy',
      sleep: '9+',
      tags: ['grateful', 'optimistic'],
      comment: 'Woke up early and finally tackled a big project!',
    },
  ]

  const numRecentDays = 14
  const today = new Date()
  const recentData: PartialDataPointWithDate[] = Array.from(
    { length: numRecentDays },
    (_, i) => subDays(today, numRecentDays - 1 - i)
  )
    .map((date) => format(date, 'yyyy-MM-dd'))
    .map((date) => {
      const point = data.find((d) => d.date === date)
      return point || { date }
    })
  const todayData = await getTodayData()

  return (
    <div className="flex min-h-dvh flex-col items-center px-200 pt-400 pb-800">
      <Header />
      <Spacer className="h-600" />
      <MoodLogPrompt />
      <Spacer className="h-600" />
      {todayData ? (
        <>
          <TodayMoodDisplay data={todayData} />
          <Spacer className="h-400" />
        </>
      ) : (
        <>
          <LogDialog />
          <Spacer className="h-600" />
        </>
      )}
      <AverageDisplay moodData={moodData} sleepData={sleepData} />
      <Spacer className="h-400" />
      <TrendsDisplay data={recentData} />
    </div>
  )
}
