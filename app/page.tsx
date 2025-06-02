import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-y-4">
      <Button className="txt-preset-5">Sign Up</Button>
      <Button className="txt-preset-5" disabled>
        Sign Up
      </Button>
    </div>
  )
}
