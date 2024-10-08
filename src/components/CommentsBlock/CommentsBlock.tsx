/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  createComment,
  getComments,
  selectComments,
  selectCreateCommentStatus
} from '../../features/comments/commentsSlice'
import { Button, Divider, Textarea } from '@nextui-org/react'
import { addExpToUser, selectUser } from '../../features/user/userSlice'
import Comment from './components/Comment'
import AddCommentButton from './components/AddCommentButton'
import { toast } from 'react-toastify'

interface Props {
  animeId: string
}
const CommentsBlock = ({ animeId }: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const comments = useAppSelector(selectComments)
  const createStatus = useAppSelector(selectCreateCommentStatus)
  const user = useAppSelector(selectUser)
  const [addCommentFormShow, setAddCommentFormShow] = useState(false)
  const [value, setValue] = useState('')

  const handleShowCommentForm = useCallback(() => {
    if (user) {
      setAddCommentFormShow(true)
    } else {
      toast('Комментировать могут только зарегистрированные пользователи', {
        type: 'error'
      })
    }
  }, [])

  useEffect(() => {
    dispatch(getComments({ animeId, limit: 5, offset: 0 }))
  }, [])

  useEffect(() => {
    if (createStatus === 'success') {
      setAddCommentFormShow(false)
      dispatch(getComments({ animeId, limit: 5, offset: 0 }))
    }
  }, [createStatus])

  const handleTextChange = useCallback((value: string) => {
    setValue(value)
  }, [])

  const handleSubmitComment = useCallback(() => {
    if (user && animeId && value) {
      const payload = {
        userId: user._id,
        animeId,
        replyCommentId: null,
        text: value,
        parentCommentId: null
      }
      dispatch(createComment(payload)).then(() => {
        dispatch(addExpToUser(user._id, 10))
      })
    }
  }, [value, animeId, user, dispatch])

  return (
    <div className="flex w-full flex-col mt-4">
      <div className="flex items-center gap-2">
        <h2 className="font-bold text-3xl">Комментарии</h2>
        <AddCommentButton onClick={handleShowCommentForm} />
      </div>
      {addCommentFormShow && (
        <div className="w-full mt-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-900">
            <Textarea
              label="Добавить комментарий"
              labelPlacement="outside"
              id="comment"
              placeholder="Введите текст..."
              required
              radius="sm"
              value={value}
              onValueChange={handleTextChange}
            />
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-800 dark:bg-gray-800">
            <Button
              onClick={handleSubmitComment}
              radius="sm"
              className="text-white bg-[#eb5628]"
              variant="solid"
            >
              Добавить
            </Button>
          </div>
        </div>
      )}
      {comments?.length > 0 ? (
        <div className="flex flex-col gap-3 pt-3">
          {comments.map((comment, index) => (
            <>
              <Comment key={comment._id} comment={comment} />
              {index + 1 !== comments.length && <Divider />}
            </>
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center w-full min-h-28'>
          <span className='font-bold text-xl text-gray-600'>Будьте первым, кто оставит комментарий</span>
        </div>
      )}
    </div>
  )
}

export default CommentsBlock
