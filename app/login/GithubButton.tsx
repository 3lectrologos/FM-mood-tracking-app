'use client'

import { FaGithub } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'

export default function GithubButton() {
  async function githubLogin() {
    await authClient.signIn.social({
      provider: 'github',
    })
  }

  return (
    <Button onClick={githubLogin}>
      <FaGithub size={26} />
    </Button>
  )
}
