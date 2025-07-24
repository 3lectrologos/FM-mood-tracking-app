'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
  await auth.api.signOut({ headers: await headers() })
  redirect('/login')
}

export async function onMagicLinkSubmit(data: { name: string; email: string }) {
  // TODO
}
