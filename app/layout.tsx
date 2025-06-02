import type { Metadata } from 'next'
import { Reddit_Sans } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'

const redditSans = Reddit_Sans({
  variable: '--font-reddit-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mood Tracker',
  description: 'Track your daily mood with ease',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${redditSans.variable} antialiased`}>{children}</body>
    </html>
  )
}
