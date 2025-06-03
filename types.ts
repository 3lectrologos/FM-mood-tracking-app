export type DataType = 'mood' | 'sleep'
export type Mood = 'very sad' | 'sad' | 'neutral' | 'happy' | 'very happy'
export type Sleep = '0-2' | '3-4' | '5-6' | '7-8' | '9+'

export type AverageMood = {
  type: 'mood'
  value?: Mood
}

export type AverageSleep = {
  type: 'sleep'
  value?: Sleep
}

export type AverageData = AverageMood | AverageSleep
