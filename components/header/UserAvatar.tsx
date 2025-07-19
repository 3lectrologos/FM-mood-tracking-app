import PlaceholderIcon from '@/assets/images/avatar-placeholder.svg'
import DropdownArrowIcon from '@/assets/images/icon-dropdown-arrow.svg'
import SettingsIcon from '@/assets/images/icon-settings.svg'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import LogoutButton from '@/components/header/LogoutButton'
import { auth } from '@/lib/auth'

export default async function UserAvatar({
  user,
}: {
  user: typeof auth.$Infer.Session.user
}) {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-x-2.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
          {user.image ? (
            <img src={user.image} alt="user avatar" />
          ) : (
            <PlaceholderIcon />
          )}
        </div>
        <DropdownArrowIcon className="w-[11px]" />
      </PopoverTrigger>
      <PopoverContent
        className="right-2 left-2 flex w-[calc(100vw-2rem)] flex-col items-start gap-150 rounded-8 border-none bg-neutral-0 px-200 py-150 shadow-popover tablet:w-[200px]"
        align="end"
        sideOffset={16}
      >
        <div className="flex w-full flex-col gap-025">
          <span className="truncate txt-preset-6">{user.name}</span>
          <span className="truncate txt-preset-7 text-neutral-300">
            {user.email}
          </span>
        </div>
        <div className="h-px w-full bg-blue-100" />
        <Button
          className="w-full items-center justify-start gap-125"
          variant="bare"
        >
          <SettingsIcon className="size-4 shrink-0" />
          <span className="truncate txt-preset-7">Settings</span>
        </Button>
        <LogoutButton />
      </PopoverContent>
    </Popover>
  )
}
