import { Avatar, useDisclosure } from '@nextui-org/react'

import AvatarModal from '../Common/AvatarModal/AvatarModal'
import { useCallback } from 'react'

interface Props {
  userAvatar: string
  onSaveAvatar: (avatar: File) => void
}

const AvatarSelect = ({ userAvatar, onSaveAvatar }: Props): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpen = useCallback(() => {
    onOpen()
  }, [onOpen])


  const handleSubmit = useCallback((image: File) => {
    if (image) {
      onSaveAvatar(image)
      onClose()
    }
  }, [onSaveAvatar, onClose])

  return (
    <div
      onClick={handleOpen}
      className="cursor-pointer rounded-full bg-gray-200 transition duration-300 relative"
    >
      <Avatar src={userAvatar} className="w-40 h-40 text-large" />
      <span className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
        <span className="text-white text-base font-bold bg-[#eb5628] px-2 rounded-md">
          Изменить
        </span>
      </span>
      <AvatarModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default AvatarSelect
