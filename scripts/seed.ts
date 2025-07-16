import { db } from '@/drizzle/client'
import { data } from '@/drizzle/schema'
import { DataPoint } from '@/types'

async function seedData() {
  console.log('Seeding data...')
  const dataSeed: DataPoint[] = [
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
    {
      date: '2025-07-10',
      mood: 'happy',
      sleep: '7-8',
      tags: ['disappointed', 'confident', 'content'],
      comment:
        'Life is good, but I feel a bit disappointed about missing a deadline.',
    },
  ]

  await db.insert(data).values(dataSeed)
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
