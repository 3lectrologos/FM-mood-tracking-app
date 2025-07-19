import { db } from '@/drizzle/client'
import { data } from '@/drizzle/schema'
import { DataPoint } from '@/types'

async function seedData() {
  console.log('Seeding data...')
  const dataSeed: DataPoint[] = [
    {
      date: '2025-07-06',
      mood: 'sad',
      sleep: '5-6',
      tags: ['anxious', 'tired'],
      comment: 'What a long day! Feeling anxious and tired.',
    },
    {
      date: '2025-07-07',
      mood: 'sad',
      sleep: '3-4',
      tags: ['disappointed', 'frustrated'],
      comment: 'Feeling down today, not sure why.',
    },
    {
      date: '2025-07-08',
      mood: 'neutral',
      sleep: '5-6',
      tags: ['irritable', 'tired'],
      comment: 'Slept poorly last night, woke up feeling irritable.',
    },
    {
      date: '2025-07-10',
      mood: 'happy',
      sleep: '7-8',
      tags: ['disappointed', 'confident', 'content'],
      comment:
        'Life is good, but I feel a bit disappointed about missing a deadline.',
    },
    {
      date: '2025-07-11',
      mood: 'neutral',
      sleep: '7-8',
      tags: [],
      comment: 'Life good.',
    },
    {
      date: '2025-07-13',
      mood: 'very sad',
      sleep: '0-2',
      comment: 'Feeling overwhelmed with work.',
      tags: [],
    },
    {
      date: '2025-07-15',
      mood: 'very happy',
      sleep: '9+',
      tags: ['grateful', 'optimistic'],
      comment: 'Woke up early and finally tackled a big project!',
    },
  ]
  const dataSeedWithUserId = dataSeed.map((item) => ({
    ...item,
    userId: 'aiBtNrqKwtDIK738dnGaeoeo8TKjd7e7',
  }))

  await db.insert(data).values(dataSeedWithUserId)
}

async function seed() {
  console.log('Dropping existing data...')
  await db.delete(data)
  await seedData()
}

seed().catch((error) => {
  console.error('Error seeding data:', error)
  process.exit(1)
})
