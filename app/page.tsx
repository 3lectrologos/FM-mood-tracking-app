import Logo from '@/assets/images/logo.svg'
import Spacer from '@/components/Spacer'
import MoodLogPrompt from '@/components/MoodLogPrompt'
import AverageDisplay from '@/components/AverageDisplay'
import { AverageMood, AverageSleep, PartialDataPointWithDate } from '@/types'
import TrendsDisplay from '@/components/TrendsDisplay'
import { subDays } from 'date-fns'
import TodayMoodDisplay from '@/components/TodayMoodDisplay'
import LogDialog from '@/components/LogDialog'
import { getRecentData, getTodayData } from '@/drizzle/queries'
import { median, formatDate } from '@/lib/utils'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import UserAvatar from '@/components/header/UserAvatar'

const NUM_RECENT_DAYS = 11
const NUM_DAYS_TO_MEDIAN = 5

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  const recentData = await getRecentData(session.user.id, NUM_RECENT_DAYS)
  const filledRecentData: PartialDataPointWithDate[] = Array.from(
    { length: NUM_RECENT_DAYS },
    (_, i) => subDays(new Date(), NUM_RECENT_DAYS - 1 - i)
  )
    .map((date) => formatDate(date))
    .map((date) => {
      const point = recentData.find((d) => d.date === date)
      return point || { date }
    })

  const averageMood = {
    type: 'mood',
    value: median(recentData.slice(-NUM_DAYS_TO_MEDIAN).map((d) => d.mood)),
    previous: median(
      recentData
        .slice(-2 * NUM_DAYS_TO_MEDIAN, -NUM_DAYS_TO_MEDIAN)
        .map((d) => d.mood)
    ),
  } as AverageMood

  const averageSleep = {
    type: 'sleep',
    value: median(recentData.slice(-NUM_DAYS_TO_MEDIAN).map((d) => d.sleep)),
    previous: median(
      recentData
        .slice(-2 * NUM_DAYS_TO_MEDIAN, -NUM_DAYS_TO_MEDIAN)
        .map((d) => d.sleep)
    ),
  } as AverageSleep

  const todayData = await getTodayData(session.user.id)

  return (
    <div className="flex min-h-dvh justify-center px-200 pt-400 pb-800 tablet:px-400 tablet:pt-500">
      <div className="flex max-w-full flex-col items-center tablet:grow-0">
        <div className="flex w-full items-center justify-between">
          <Logo />
          <UserAvatar user={session.user} />
        </div>
        <Spacer className="h-600 desktop:h-800" />
        <MoodLogPrompt name={session.user.name} />
        <Spacer className="h-600 desktop:h-800" />
        {todayData ? (
          <>
            <TodayMoodDisplay data={todayData} />
            <Spacer className="h-400" />
          </>
        ) : (
          <>
            <LogDialog />
            <Spacer className="h-600 desktop:h-800" />
          </>
        )}
        <div className="flex max-w-full flex-col gap-400 desktop:flex-row">
          <AverageDisplay
            className="desktop:w-[370px]"
            moodData={averageMood}
            sleepData={averageSleep}
          />
          <TrendsDisplay data={filledRecentData} />
        </div>
      </div>
    </div>
  )
}
