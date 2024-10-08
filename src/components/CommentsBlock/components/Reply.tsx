import { Comment as CommentI } from '../../../types/comments'

import { Avatar, Link, Tooltip } from '@nextui-org/react'
import dayjs from 'dayjs'
import { useAppSelector } from '../../../app/hooks'
import { selectUser } from '../../../features/user/userSlice'

import ReplyIcon from '../../../assets/icons/reply.svg?react'
import HeartIcon from '../../../assets/icons/heart.svg?react'

import { useCallback, useMemo } from 'react'

interface Props {
  reply: CommentI
  onLikeClick: (commentId: string) => void
  onReplyClick: (replyId: string) => void
}

const Reply = ({ reply, onReplyClick, onLikeClick }: Props) => {
  const user = useAppSelector(selectUser)

  const handleReplyClick = useCallback(() => {
    onReplyClick(reply._id)
  }, [onReplyClick, reply._id])

  const handleLikeClick = useCallback(() => {
    onLikeClick(reply._id)
  }, [onLikeClick, reply._id])

  const likeTotal = useMemo(() => {
    return reply.likes
  }, [reply.likes])

  const isLiked = useMemo(() => {
    return user ? reply.likedBy.includes(user?._id) : false
  }, [reply.likedBy, user])


  return (
    <div className="flex gap-3 items-start border-b-">
      <Link href={`/user/${reply.user.userId}`}>
        <Avatar
          src={reply.user.profile.avatar}
          alt={`Avatar ${reply.user.userId}`}
          className="min-w-[56px]"
          size="lg"
        />
      </Link>
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <Link
            href={`/user/${reply.user.userId}`}
            className="font-medium text-lg text-[#eb5628] cursor-pointer"
          >
            {reply.user.username}
          </Link>
          <span className="text-gray-500 text-sm">
            {reply.user.profile.level} уровень
          </span>
          {reply.replyUser?.username && (
            <Tooltip content={reply.replyUser.text}>
              <span className="text-gray-500 text-sm flex gap-1 cursor-default">
                <ReplyIcon width={16} /> {reply.replyUser.username}
              </span>
            </Tooltip>
          )}
        </div>
        <p className="text-base">{reply.text}</p>
        <div className="flex gap-2 items-center">
          <p className="text-sm text-gray-500">
            {dayjs(reply.createdAt).format('D MMMM в HH:mm')}
          </p>
          {user && user?._id !== reply.user.userId && (
            <div
              onClick={handleReplyClick}
              className="text-sm text-[#eb5628] underline-offset-2 hover:underline transition ease-in-out duration-150 cursor-pointer"
            >
              Ответить
            </div>
          )}
          <div onClick={handleLikeClick} className="flex items-center gap-1">
            <HeartIcon
              width={16}
              className={
                isLiked
                  ? 'fill-[#eb5628] stroke-[#eb5628] cursor-pointer'
                  : 'cursor-pointer stroke-gray-600'
              }
            />
            <span className="text-sm font-bold text-gray-600">{likeTotal}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reply
