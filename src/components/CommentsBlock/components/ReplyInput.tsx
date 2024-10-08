import { Avatar, Textarea } from '@nextui-org/react'
import { ChangeEvent, useCallback } from 'react'

import SendIcon from '../../../assets/icons/send.svg?react'

interface Props {
  userAvatar: string
  value: string
  onSubmit: () => void
  onChange: (value: string) => void
}
const ReplyInput = ({ userAvatar, value, onChange, onSubmit }: Props): JSX.Element => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return (
    <div className="relative mt-6 flex gap-2 items-start">
      <Avatar
          src={userAvatar}
          size="sm"
          className='min-h-[40px] min-w-[40px]'
        />
      <Textarea
        type="text"
        placeholder="Введите ответ"
        value={value}
        minRows={1}
        onChange={handleChange}
        className="relative min-w-96"
        radius="sm"
      />

      <div
        onClick={onSubmit}
        className="min-h-[40px] flex justify-center items-center"
      >
        <SendIcon
          width={32}
          className="transition ease-in-out duration-150 cursor-pointer hover:fill-[#eb5628]"
        />
      </div>
    </div>
  )
}

export default ReplyInput
