import { pgTable, text, date } from 'drizzle-orm/pg-core'

export const data = pgTable('data', {
  date: date({ mode: 'string' }).notNull().primaryKey(),
  mood: text().notNull(),
  sleep: text().notNull(),
  comment: text().notNull(),
  tags: text().array().notNull().default([]),
})
