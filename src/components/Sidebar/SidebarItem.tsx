import clsx from 'clsx'
import { useSidebarContext } from '../Layout/layout-context'
import { Link } from 'react-router-dom'
import { Tooltip } from '@nextui-org/react'

interface Props {
  title: string
  icon: React.ReactNode
  onClick?: () => void
  isActive?: boolean
  href?: string
}

export const SidebarItem = ({
  icon,
  title,
  onClick,
  isActive,
  href
}: Props) => {
  const { setCollapsed } = useSidebarContext()

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed()
    }
  }
  return (
    <Tooltip
      classNames={{
        content: ['text-white bg-[#eb5628]']
      }}
      radius="sm"
      placement="right"
      content={title}
    >
      {onClick ? (
        <div
          className={clsx(
            'hover:bg-default-100',
            'flex gap-2 w-11 min-h-11 min-w-11 h-11 items-center justify-center rounded-lg cursor-pointer transition-all duration-150 active:scale-[0.98]'
          )}
          onClick={onClick}
        >
          {icon}
        </div>
      ) : (
        <Link
          to={href || ''}
          className="text-default-900 active:bg-none max-w-full"
        >
          <div
            className={clsx(
              isActive ? '[&_svg_path:not(:first-child)]:fill-[#eb5628]' : 'hover:bg-default-100',
              'flex gap-2 w-11 min-h-11 min-w-11 h-11 items-center justify-center rounded-lg cursor-pointer transition-all duration-150 active:scale-[0.98]'
            )}
            onClick={handleClick}
          >
            {icon}
          </div>
        </Link>
      )}
    </Tooltip>
  )
}
