import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Mood, moodValues, Sleep, sleepValues } from '@/types'
import { isAfter, isBefore, startOfDay, subDays } from 'date-fns'

import IconVeryHappyColor from '@/assets/images/icon-very-happy-color.svg'
import IconHappyColor from '@/assets/images/icon-happy-color.svg'
import IconNeutralColor from '@/assets/images/icon-neutral-color.svg'
import IconSadColor from '@/assets/images/icon-sad-color.svg'
import IconVerySadColor from '@/assets/images/icon-very-sad-color.svg'

import IconVeryHappyWhite from '@/assets/images/icon-very-happy-white.svg'
import IconHappyWhite from '@/assets/images/icon-happy-white.svg'
import IconNeutralWhite from '@/assets/images/icon-neutral-white.svg'
import IconSadWhite from '@/assets/images/icon-sad-white.svg'
import IconVerySadWhite from '@/assets/images/icon-very-sad-white.svg'

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

export function getMoodIcon(mood: Mood, type: 'color' | 'white' = 'color') {
  switch (mood) {
    case 'very happy':
      return type === 'color' ? IconVeryHappyColor : IconVeryHappyWhite
    case 'happy':
      return type === 'color' ? IconHappyColor : IconHappyWhite
    case 'neutral':
      return type === 'color' ? IconNeutralColor : IconNeutralWhite
    case 'sad':
      return type === 'color' ? IconSadColor : IconSadWhite
    case 'very sad':
      return type === 'color' ? IconVerySadColor : IconVerySadWhite
  }
}
