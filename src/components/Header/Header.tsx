import {
  Button,
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Tooltip,
  useDisclosure
} from '@nextui-org/react'
import React, { useCallback } from 'react'

import { useAppSelector } from '../../app/hooks'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import DarkModeSwitch from './DarkModeSwitch'
import { selectUser } from '../../features/user/userSlice'
import { UserDropdown } from '../UserDropdown/UserDropdown'
import useDarkMode from 'use-dark-mode'

import TomiIcon from '../../assets/icons/tomi.svg?react'
import VkLogo from '../../assets/social/vk_logo.svg?react'

import IconSearch from '../../assets/icons/search.svg?react'
import IconBookmarksFilled from '../../assets/icons/bookmark_filled.svg?react'
import IconVersionsFilled from '../../assets/icons/catalog_filled.svg?react'
import IconHomeFilled from '../../assets/icons/home_filled.svg?react'
import IconDice5Filled from '../../assets/icons/dice_filled.svg?react'
import API from '../../api/config'
import SearchModal from '../Common/Modals/SearchModal/SearchModal'

interface Props {
  children: React.ReactNode
}

export const Header = ({ children }: Props) => {
  const darkMode = useDarkMode(false)
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()
  const pathname = useLocation()

  const handleMenuItemClick = () => {
    setIsMenuOpen(false)
  }

  const handleRandomClick = useCallback(async () => {
    const response = await API.request(`animes/random`, 'GET')
    navigate(`/anime/${response.animeId}`)
    setIsMenuOpen(false)
  }, [navigate])

  return (
    <div className="relative flex w-full flex-col overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: 'w-full max-w-full'
        }}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="md:hidden">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </NavbarContent>
        <NavbarContent justify="start">
          <Link to="https://vk.com/tenshianime">
            <VkLogo
              width={28}
              className="hover:opacity-80 transition ease-in-out duration-150 cursor-pointer"
            />
          </Link>
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          {user && (
            <Tooltip
              classNames={{
                content: ['text-white bg-[#eb5628]']
              }}
              content="Томи"
              placement="bottom"
            >
              <div className="flex gap-2 items-center">
                <TomiIcon className="w-[24px] h-[24px]" />
                <span className="font-bold">{user.profile.points}</span>
              </div>
            </Tooltip>
          )}
          <DarkModeSwitch
            onChange={darkMode.toggle}
            isSelected={darkMode.value}
          />
          {user ? (
            <UserDropdown
              email={user.email}
              username={user.username}
              avatar={user?.profile?.avatar || ''}
              level={user.profile.level}
            />
          ) : (
            <Link to="/login">
              <Button
                className="border-[#eb5628] text-[#eb5628] hover:!bg-[#eb5628] hover:text-white"
                variant="ghost"
                radius="md"
              >
                Войти
              </Button>
            </Link>
          )}
        </NavbarContent>
        <NavbarMenu className="z-50 pt-10 flex flex-col gap-2">
          <NavbarMenuItem
            onClick={() => {
              onOpen()
              handleMenuItemClick()
            }}
            className="flex gap-2 items-center cursor-pointer py-3"
          >
            <IconSearch />
            <span className="font-medium">Поиск</span>
          </NavbarMenuItem>
          <NavbarMenuItem
            onClick={handleMenuItemClick}
            className="flex gap-2 cursor-pointer py-3"
          >
            <Link className="w-full flex gap-2 items-center font-medium" to="/">
              <IconHomeFilled
                className={pathname.pathname === '/' ? 'fill-[#eb5628]' : ''}
              />
              <span
                className={pathname.pathname === '/' ? 'text-[#eb5628]' : ''}
              >
                Главная
              </span>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem onClick={handleMenuItemClick} className="flex gap-2 cursor-pointer py-3">
            <Link
              className="w-full flex gap-2 items-center"
              to="/anime/catalog"
            >
              <IconVersionsFilled
                className={
                  pathname.pathname === '/anime/catalog' ? 'fill-[#eb5628]' : ''
                }
              />
              <span
                className={
                  pathname.pathname === '/anime/catalog' ? 'text-[#eb5628]' : ''
                }
              >
                Каталог
              </span>
            </Link>
          </NavbarMenuItem>
          {user && (
            <NavbarMenuItem onClick={handleMenuItemClick} className="flex gap-2 cursor-pointer py-3">
              <Link
                className="w-full flex gap-2 items-center"
                to="/profile/lists"
              >
                <IconBookmarksFilled
                  className={
                    pathname.pathname === '/profile/lists'
                      ? 'fill-[#eb5628]'
                      : ''
                  }
                />
                <span
                  className={
                    pathname.pathname === '/profile/lists'
                      ? 'text-[#eb5628]'
                      : ''
                  }
                >
                  Списки
                </span>
              </Link>
            </NavbarMenuItem>
          )}
          <NavbarMenuItem
            onClick={handleRandomClick}
            className="flex gap-2 cursor-pointer py-3"
          >
            <IconDice5Filled />
            <span className="font-medium">Случайный релиз</span>
          </NavbarMenuItem>
        </NavbarMenu>
        <SearchModal
          onClose={onClose}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </Navbar>
      {children}
    </div>
  )
}
