import { useQuery } from '@tanstack/react-query'

import classes from './GeneralFrameVideo.module.css'
import { getKodikPlayer } from '../../lib/actions'
import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addExpToUser, selectUser } from '../../features/user/userSlice'

export default function KodikVideo({ id }: { id: string }) {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  const { data, isPending } = useQuery({
    queryKey: ['anime', 'kodik', id],
    queryFn: async () => getKodikData()
  })

  const kodikMessageListener = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (message: any) => {
      if (user) {
        if (message.data.key == 'kodik_player_video_started') {
          dispatch(addExpToUser(user._id, 10))
        }
      }
    },
    [dispatch, user]
  )

  useEffect(() => {
    window?.addEventListener('message', kodikMessageListener)
    return () => {
      window?.removeEventListener('message', kodikMessageListener)
    }
  }, [kodikMessageListener])

  async function getKodikData() {
    const kodikData = await getKodikPlayer({ shikimoriId: id })

    if (!kodikData) {
      return null
    }

    return kodikData
  }

  if (!isPending && !data) {
    return <div className="font-bold">Не найдено</div>
  }

  // if (window.addEventListener) {
  //   window.addEventListener('message', kodikMessageListener);
  // } else {
  //   window.attachEvent('onmessage', kodikMessageListener);
  // }

  return (
    <div className={classes.frame}>
      <iframe
        className={classes.iframe}
        src={data?.link}
        allow="autoplay *; fullscreen *"
      />
    </div>
  )
}
