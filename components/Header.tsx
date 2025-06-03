import Logo from '@/assets/images/logo.svg'
import UserAvatar from '@/components/UserAvatar'

export default function Header() {
  return (
    <div className="flex w-full items-center justify-between">
      <Logo />
      <UserAvatar />
    </div>
  )
}
