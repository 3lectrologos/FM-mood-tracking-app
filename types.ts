export const moodValues = [
  'very sad',
  'sad',
  'neutral',
  'happy',
  'very happy',
] as const
export type Mood = (typeof moodValues)[number]

export const sleepValues = ['0-2', '3-4', '5-6', '7-8', '9+'] as const
export type Sleep = (typeof sleepValues)[number]

export const tagValues = [
  'joyful',
  'down',
  'anxious',
  'calm',
  'excited',
  'frustrated',
  'lonely',
  'grateful',
  'overwhelmed',
  'motivated',
  'irritable',
  'peaceful',
  'tired',
  'hopeful',
  'confident',
  'stressed',
  'content',
  'disappointed',
  'optimistic',
  'restless',
] as const
export type Tag = (typeof tagValues)[number]

export type AverageMood = {
  type: 'mood'
  value?: Mood
  previous?: Mood
}

export type AverageSleep = {
  type: 'sleep'
  value?: Sleep
  previous?: Sleep
}

export type AverageData = AverageMood | AverageSleep
