import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Mood, moodValues, Sleep, sleepValues } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function compareMoods(mood1: Mood, mood2: Mood) {
  return moodValues.indexOf(mood2) - moodValues.indexOf(mood1)
}

export function compareSleeps(sleep1: Sleep, sleep2: Sleep) {
  return sleepValues.indexOf(sleep2) - sleepValues.indexOf(sleep1)
}
