import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-y-8">
      <Button>Sign Up</Button>
      <Button disabled>Sign Up</Button>
      <Button variant="secondary">Upload</Button>
      <Input placeholder="name@mail.com" className="w-64" />
    </div>
  )
}
