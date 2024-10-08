import { useCallback, useEffect, useMemo, useState } from 'react'
import { Comment as CommentI } from '../../../types/comments'
import API from '../../../api/config'
import { Avatar, Link } from '@nextui-org/react'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectUser } from '../../../features/user/userSlice'
import ReplyInput from './ReplyInput'
import {
  createComment,
  likeComment,
  selectCreateCommentStatus
} from '../../../features/comments/commentsSlice'
import Reply from './Reply'
import TenshiSpinner from '../../TenshiSpinner/TenshiSpinner'

import HeartIcon from '../../../assets/icons/heart.svg?react'
import { toast } from 'react-toastify'

interface Props {
  comment: CommentI
}

const Comment = ({ comment }: Props) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const createReplyStatus = useAppSelector(selectCreateCommentStatus)
  const [replies, setReplies] = useState<CommentI[]>([])
  const [totalReplies, setTotalReplies] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false)
  const [addReplyFormShow, setAddReplyFormShow] = useState(false)
  const [value, setValue] = useState('')
  const [replyCommentId, setReplyCommentId] = useState<string | null>(null)
  const [limitReplies, setLimitReplies] = useState(3)

  const handleReplyChange = useCallback((value: string) => {
    setValue(value)
  }, [])

  const fetchReplies = useCallback(
    async (limit: number) => {
      try {
        const response = await API.request(
          `comments/list/replies?commentId=${comment._id}&limit=${limit}`,
          'GET'
        )
        setLimitReplies(limitReplies + 5)
        setReplies(response.replies)
        setTotalReplies(response.totalReplies)
      } catch (error) {
        console.error('Ошибка при загрузке ответов:', error)
      }
    },
    [comment._id, limitReplies]
  )

  const handleReplySubmit = useCallback(() => {
    if (user && value) {
      const payload = {
        userId: user._id,
        replyCommentId: replyCommentId,
        animeId: comment.animeId,
        text: value,
        parentCommentId: comment._id
      }
      dispatch(createComment(payload)).then(() => {
        fetchReplies(50)
      })
    }
    setReplyCommentId(null)
    setAddReplyFormShow(false)
  }, [
    comment._id,
    comment.animeId,
    dispatch,
    fetchReplies,
    replyCommentId,
    user,
    value
  ])

  const handleLikeClick = useCallback(
    async (commentId?: string) => {
      if (user) {
        dispatch(
          likeComment({
            userId: user._id,
            commentId: commentId ? commentId : comment._id
          })
        )
      } else {
        toast('Ставить реакции могут только зарегистрированные пользователи', {
          type: 'error'
        })
      }
    },
    [comment._id, dispatch, user]
  )

  const handleLikeReplyClick = useCallback(
    async (replyId?: string) => {
      if (user) {
        const payload = {
          userId: user._id,
          commentId: replyId
        }
        const response = await API.request(`comments/like`, 'POST', payload)
        if (response.comment) {
          const newReplies = replies.map((reply) =>
            reply._id === response.comment._id ? response.comment : reply
          )
          setReplies(newReplies)
        }
      } else {
        toast('Ставить реакции могут только зарегистрированные пользователи', {
          type: 'error'
        })
      }
    },
    [replies, user]
  )

  useEffect(() => {
    if (createReplyStatus === 'success') {
      setReplyCommentId(null)
      setAddReplyFormShow(false)
    }
  }, [createReplyStatus])

  const handleAddReplyFormShow = useCallback((replyId?: string) => {
    if (replyId) {
      setReplyCommentId(replyId)
    }
    setAddReplyFormShow(true)
  }, [])

  // Загрузка первых 3 ответов
  useEffect(() => {
    if (comment.totalReplies > 0) {
      fetchReplies(limitReplies)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Функция для загрузки дополнительных ответов
  const loadMoreReplies = async () => {
    setLoadingMore(true)
    try {
      const response = await API.request(
        `comments/list/replies?commentId=${comment._id}&limit=${limitReplies}`,
        'GET'
      )
      setReplies(response.replies)
      setLimitReplies(limitReplies + 5)
    } catch (error) {
      console.error('Ошибка при загрузке дополнительных ответов:', error)
    } finally {
      setLoadingMore(false)
    }
  }

  const likeTotal = useMemo(() => {
    return comment.likes
  }, [comment.likes])

  const isLiked = useMemo(() => {
    return user ? comment.likedBy.includes(user?._id) : false
  }, [comment.likedBy, user])

  return (
    <div className="flex gap-3 items-start border-b-">
      <Link href={`/user/${comment.user.userId}`}>
        <Avatar
          src={comment.user.profile.avatar}
          alt={`Avatar ${comment.user.userId}`}
          className="min-w-[56px]"
          size="lg"
        />
      </Link>
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <Link
            href={`/user/${comment.user.userId}`}
            className="font-medium text-lg text-[#eb5628] cursor-pointer"
          >
            {comment.user.username}
          </Link>
          <span className="text-gray-500 text-sm">
            {comment.user.profile.level} уровень
          </span>
        </div>
        <p className="text-base">{comment.text}</p>
        <div className="flex gap-3 items-center">
          <p className="text-sm text-gray-500">
            {dayjs(comment.createdAt).format('D MMMM в HH:mm')}
          </p>
          {user && user?._id !== comment.user.userId && (
            <div
              onClick={() => handleAddReplyFormShow()}
              className="text-sm text-[#eb5628] underline-offset-2 hover:underline transition ease-in-out duration-150 cursor-pointer"
            >
              Ответить
            </div>
          )}
          <div
            onClick={() => handleLikeClick()}
            className="flex items-center gap-1"
          >
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
        {replies.length > 0 &&
          replies.map((reply) => (
            <Reply
              onReplyClick={handleAddReplyFormShow}
              onLikeClick={handleLikeReplyClick}
              reply={reply}
              key={reply._id}
            />
          ))}
        {totalReplies !== replies.length &&
          (loadingMore ? (
            <TenshiSpinner />
          ) : (
            <div
              onClick={loadMoreReplies}
              className="text-sm text-[#eb5628] underline-offset-2 hover:underline transition ease-in-out duration-150 cursor-pointer"
            >
              Загрузить еще
            </div>
          ))}
        {addReplyFormShow && user && (
          <ReplyInput
            userAvatar={user.profile.avatar}
            value={value}
            onChange={handleReplyChange}
            onSubmit={handleReplySubmit}
          />
        )}
      </div>
    </div>
  )
}

export default Comment
