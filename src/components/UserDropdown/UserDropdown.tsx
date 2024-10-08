import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
  User
} from '@nextui-org/react'
import { useCallback } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { logout } from '../../features/user/userSlice'

interface Props {
  username: string
  email: string
  avatar: string
  level: number
}

export const UserDropdown = ({ username, email, avatar, level }: Props) => {
  const dispatch = useAppDispatch()

  const handleLogout = useCallback(async () => {
    dispatch(logout())
  }, [dispatch])

  return (
    <Dropdown>
      <NavbarItem>
        <Badge
          content={level}
          placement="bottom-left"
          className='bg-[#eb5628] text-white border-none'
          
        >
          <DropdownTrigger>
            <Avatar as="button" color="default" size="md" src={avatar} />
          </DropdownTrigger>
        </Badge>
      </NavbarItem>

      <DropdownMenu
        aria-label="User menu actions"
        disabledKeys={['profile']}
        className="p-3"
        classNames={{
          base: [
            'rounded-md',
            'text-default-500',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'data-[hover=true]:bg-default-100',
            'data-[selectable=true]:focus:bg-default-50',
            'data-[pressed=true]:opacity-70',
            'data-[focus-visible=true]:ring-default-500'
          ]
        }}
      >
        <DropdownItem
          isReadOnly
          key="profile"
          className="h-14 gap-2 opacity-100"
        >
          <User
            name={username}
            description={email}
            avatarProps={{
              size: 'sm',
              src: avatar
            }}
          />
        </DropdownItem>
        <DropdownItem key="settings" href="/profile">
          Профиль
        </DropdownItem>
        <DropdownItem key="help_and_feedback" href="/contact">Помощь и контакты</DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          onPress={handleLogout}
        >
          Выйти
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
