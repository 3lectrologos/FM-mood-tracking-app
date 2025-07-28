import { betterAuth } from 'better-auth'
import { magicLink } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/drizzle/client'
import { nextCookies } from 'better-auth/next-js'
import * as schema from '@/drizzle/schema'
import { resend } from '@/lib/resend'
import { LoginEmailTemplate } from '@/components/LoginEmailTemplate'

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', schema }),
  user: {
    additionalFields: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.name.split(' ')[0],
          lastName: profile.name.split(' ')[1],
        }
      },
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => ({
        firstName: profile.given_name,
        lastName: profile.family_name,
      }),
    },
  },
  plugins: [
    nextCookies(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        console.log('Sending magic link to:', email)
        console.log('Magic link url:', url)
        // Simulate sending an email by waiting for 1 second
        // await new Promise((resolve) => setTimeout(resolve, 1000))
        await resend.emails.send({
          from: 'login@moodonion.site',
          to: email,
          subject: 'Your Mood Onion Login',
          react: LoginEmailTemplate({ url }),
        })
      },
    }),
  ],
})
