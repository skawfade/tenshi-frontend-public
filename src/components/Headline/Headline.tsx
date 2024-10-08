import { useAppSelector } from '../../app/hooks'
import {
  selectDashboardTrendingList
} from '../../features/dashboard/dashboardSlice'
import { Carousel } from '../Common/Carousel/Carousel'

const Headline = (): JSX.Element => {
  const animes = useAppSelector(selectDashboardTrendingList)

  return (
    <div className="w-full max-h-[60vh]">
      {animes && <Carousel animes={animes} />}
    </div>
  )
}

export default Headline
