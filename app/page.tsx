import Header from '@/components/Header'
import Spacer from '@/components/Spacer'
import MoodLogPrompt from '@/components/MoodLogPrompt'
import AverageDisplay from '@/components/AverageDisplay'
import { AverageMood, AverageSleep, PartialDataPointWithDate } from '@/types'
import TrendsDisplay from '@/components/TrendsDisplay'
import { subDays } from 'date-fns'
import TodayMoodDisplay from '@/components/TodayMoodDisplay'
import LogDialog from '@/components/LogDialog'
import { getRecentData, getTodayData } from '@/drizzle/queries'
import { formatDate } from '@/lib/utils'

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

  const today = new Date()
  const numRecentDays = 14
  const data = await getRecentData(numRecentDays)
  const recentData: PartialDataPointWithDate[] = Array.from(
    { length: numRecentDays },
    (_, i) => subDays(today, numRecentDays - 1 - i)
  )
    .map((date) => formatDate(date))
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
