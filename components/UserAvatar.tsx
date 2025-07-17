import Placeholder from '@/assets/images/avatar-placeholder.svg'
import DropdownArrow from '@/assets/images/icon-dropdown-arrow.svg'

export default function UserAvatar({ image }: { image?: string | null }) {
  return (
    <div className="flex items-center gap-x-2.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
        {image ? <img src={image} alt="user avatar" /> : <Placeholder />}
      </div>
      <DropdownArrow className="w-[11px]" />
    </div>
  )
}
