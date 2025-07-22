import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Mood, moodValues, Sleep, sleepValues } from '@/types'
import { format } from 'date-fns-tz'

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

export function compareValues<T extends Mood | Sleep>(value1: T, value2: T) {
  const moodIndex1 = moodValues.indexOf(value1 as Mood)
  if (moodIndex1 !== -1 && moodValues.includes(value2 as Mood)) {
    return (
      moodValues.indexOf(value2 as Mood) - moodValues.indexOf(value1 as Mood)
    )
  }

  const sleepIndex1 = sleepValues.indexOf(value1 as Sleep)
  if (sleepIndex1 !== -1 && sleepValues.includes(value2 as Sleep)) {
    return (
      sleepValues.indexOf(value2 as Sleep) -
      sleepValues.indexOf(value1 as Sleep)
    )
  }

  throw new Error('Both values must be of type Mood or Sleep')
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

export function getMoodText(mood: Mood) {
  switch (mood) {
    case 'very happy':
      return 'When your heart is full, share your light with the world.'
    case 'happy':
      return 'Happiness grows when it’s shared with others.'
    case 'neutral':
      return 'A calm mind can find opportunity in every moment.'
    case 'sad':
      return 'One small positive thought can change your entire day.'
    case 'very sad':
      return 'You are stronger than you think; the storm will pass.'
  }
}

export function formatDate(date: Date) {
  return format(date, 'yyyy-MM-dd', { timeZone: 'UTC' })
}

export function median<T extends Mood | Sleep>(values: T[]) {
  if (values.length === 0) return undefined
  const sortedValues = [...values].sort((a, b) => -compareValues(a, b))
  return sortedValues[Math.floor(sortedValues.length / 2)]
}
