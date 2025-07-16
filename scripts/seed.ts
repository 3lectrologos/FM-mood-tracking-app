import { db } from '@/drizzle/client'
import { data } from '@/drizzle/schema'

async function seedData() {
  console.log('Seeding data...')
  const dataSeed = [
    {
      date: '2025-07-13',
      mood: 'very sad',
      sleep: '0-2',
      comment: 'Feeling overwhelmed with work.',
      tags: [],
    },
    {
      date: '2025-07-16',
      mood: 'very happy',
      sleep: '9+',
      tags: ['grateful', 'optimistic'],
      comment: 'Woke up early and finally tackled a big project!',
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
