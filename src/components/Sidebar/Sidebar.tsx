import { SidebarStyles } from './sidebar.styles'

import { useLocation, useNavigate } from 'react-router-dom'
import { useSidebarContext } from '../Layout/layout-context'
import { SidebarItem } from './SidebarItem'

import LogoIcon from '../../assets/icons/logo1.svg?react'

import IconSearch from '../../assets/icons/search.svg?react'
import IconBookmarksFilled from '../../assets/icons/bookmark_filled.svg?react'
import IconVersionsFilled from '../../assets/icons/catalog_filled.svg?react'
import IconHomeFilled from '../../assets/icons/home_filled.svg?react'
import IconSettingsFilled from '../../assets/icons/settings_filled.svg?react'
import IconDice5Filled from '../../assets/icons/dice_filled.svg?react'

import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../features/user/userSlice'
import { Chip, Tooltip, useDisclosure } from '@nextui-org/react'
import SearchModal from '../Common/Modals/SearchModal/SearchModal'
import { useCallback } from 'react'
import API from '../../api/config'

export const Sidebar = () => {
  const user = useAppSelector(selectUser)
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  const pathname = useLocation()
  const navigate = useNavigate()
  const { collapsed, setCollapsed } = useSidebarContext()

  const handleRandomClick = useCallback(async () => {
    
    const response = await API.request(`animes/random`, 'GET')

    navigate(`/anime/${response.animeId}`)
  },[navigate])
  
  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={SidebarStyles.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={SidebarStyles({
          collapsed: collapsed
        })}
      >
        <div className="flex items-center justify-center flex-col">
          <LogoIcon width={64} height={64} />
          <Tooltip
            classNames={{
              content: ['text-white bg-[#eb5628] max-w-[230px]']
            }}
            radius="sm"
            placement="bottom"
            content="В данный момент идет разработка проекта, поэтому вы можете находить ошибки."
          >
            <Chip className="bg-[#eb5628] text-white" size="sm">
              beta
            </Chip>
          </Tooltip>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={SidebarStyles.Body()}>
            {/* TODO(medium): Сделать механизм поиска через модалку */}
            <SidebarItem
              title="Поиск"
              icon={<IconSearch className="stroke-default-400" />}
              isActive={isOpen}
              onClick={onOpen}
            />
            <SidebarItem
              title="Главная"
              icon={<IconHomeFilled className="fill-default-400" />}
              isActive={pathname.pathname === '/'}
              href="/"
            />
            <SidebarItem
              title="Каталог"
              icon={<IconVersionsFilled className="fill-default-400" />}
              isActive={pathname.pathname === '/anime/catalog'}
              href="/anime/catalog"
            />
            {/* <SidebarItem
              title="Расписание релизов"
              icon={<IconCalendarFilled className="fill-default-400" />}
              isActive={pathname.pathname === '/anime/schedule'}
              href="/anime/schedule"
            /> */}
            {user && (
              <SidebarItem
                title="Списки"
                icon={<IconBookmarksFilled className="fill-default-400" />}
                isActive={pathname.pathname === '/profile/lists'}
                href="/profile/lists"
              />
            )}
            <SidebarItem
              title="Случайный релиз"
              icon={<IconDice5Filled className="fill-default-400" />}
              onClick={handleRandomClick}
            />
          </div>
          <div className={SidebarStyles.Footer()}>
            <SidebarItem
              title="Настройки"
              icon={<IconSettingsFilled className="fill-default-400" />}
              isActive={pathname.pathname === '/settings'}
              href="/settings"
            />
          </div>
        </div>
      </div>
      <SearchModal
        onClose={onClose}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </aside>
  )
}
