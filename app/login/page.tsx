import Logo from '@/assets/images/logo.svg'
import { LoginButtons } from '@/app/login/LoginButtons'
import DisplayCard from '@/components/DisplayCard'
import MagicLinkForm from '@/app/login/MagicLinkForm'

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh justify-center px-200 pt-1000 pb-800 tablet:px-400">
      <div className="flex max-w-full flex-col gap-400 tablet:grow-0 tablet:gap-600">
        <Logo className="self-center" />
        <DisplayCard className="gap-y-400 px-200 py-400 tablet:px-400 tablet:py-500">
          <div className="flex flex-col gap-100">
            <h1 className="txt-preset-3">Start tracking!</h1>
            <h2 className="txt-preset-6-regular text-neutral-600">
              Log in to start tracking your mood and sleep.
            </h2>
          </div>
          <MagicLinkForm />
          <div className="h-px w-full bg-neutral-200" />
          <LoginButtons className="justify-center" />
        </DisplayCard>
      </div>
    </div>
  )
}
