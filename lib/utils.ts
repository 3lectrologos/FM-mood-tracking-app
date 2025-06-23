import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Mood, moodValues, Sleep, sleepValues } from '@/types'
import { isAfter, isBefore, startOfDay, subDays } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function compareMoods(mood1: Mood, mood2: Mood) {
  return moodValues.indexOf(mood2) - moodValues.indexOf(mood1)
}

export function compareSleeps(sleep1: Sleep, sleep2: Sleep) {
  return sleepValues.indexOf(sleep2) - sleepValues.indexOf(sleep1)
}

export function isWithinLastDays(daysAgo: number, date: Date): boolean {
  const today = startOfDay(new Date())
  const target = startOfDay(date)
  const startDate = startOfDay(subDays(today, daysAgo))

  return (
    (isAfter(target, startDate) || target.getTime() === startDate.getTime()) &&
    (isBefore(target, today) || target.getTime() === today.getTime())
  )
}
