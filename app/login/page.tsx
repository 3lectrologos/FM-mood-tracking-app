import GithubButton from '@/app/login/GithubButton'

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh justify-center px-200 pt-400 pb-800 tablet:px-400 tablet:pt-500">
      <div className="flex max-w-full flex-col items-center tablet:grow-0">
        <GithubButton />
      </div>
    </div>
  )
}
