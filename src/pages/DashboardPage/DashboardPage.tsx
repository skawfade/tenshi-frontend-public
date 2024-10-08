import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchAnonsAnime,
  fetchPopularityAnime,
  fetchTrendingAnime,
  selectDashboardAnonsList,
  selectDashboardAnonsListStatus,
  selectDashboardPopularityList,
  selectDashboardPopularityListStatus,
  selectDashboardTrendingList,
  selectDashboardTrendingListStatus
} from '../../features/dashboard/dashboardSlice'
import TrendingList from '../../components/TrendingList/TrendingList'
import PopularityList from '../../components/PopularityList/PopularityList'

import Headline from '../../components/Headline/Headline'
import TenshiSpinner from '../../components/TenshiSpinner/TenshiSpinner'
import { Helmet } from 'react-helmet-async'
import AnonsList from '../../components/AnonsList/AnonsList'
import API from '../../api/config'
import TopUsersBlock from '../../components/TopUsersBlock/TopUsersBlock'
import Statistic from '../../components/Statistic/Statistic'
import { StatisticType } from '../../types/statistics'

const DashboardPage = (): JSX.Element => {
  const trendingAnime = useAppSelector(selectDashboardTrendingList)
  const trendingAnimeStatus = useAppSelector(selectDashboardTrendingListStatus)

  const popularityAnime = useAppSelector(selectDashboardPopularityList)
  const popularityAnimeStatus = useAppSelector(
    selectDashboardPopularityListStatus
  )

  const anonsAnime = useAppSelector(selectDashboardAnonsList)
  const anonsAnimeStatus = useAppSelector(selectDashboardAnonsListStatus)

  const [usersByLevel, setUserByLevel] = useState([])
  const [usersByTomi, setUserByTomi] = useState([])
  const [statistic, setStatistic] = useState<StatisticType | null>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTrendingAnime())
    dispatch(fetchPopularityAnime())
    dispatch(fetchAnonsAnime())
    loadTopUsersByLevel()
    loadTopUsersByTomi()
    loadStatistics()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadTopUsersByLevel = useCallback(async () => {
    const response = await API.request(`users/list`, 'GET')

    if (response.users) {
      setUserByLevel(response.users)
    }
  }, [])

  const loadTopUsersByTomi = useCallback(async () => {
    const response = await API.request(`users/list?sortBy=points`, 'GET')

    if (response.users) {
      setUserByTomi(response.users)
    }
  }, [])

  const loadStatistics = useCallback(async () => {
    const response = await API.request(`statistic`, 'GET')

    if (response.statistics) {
      setStatistic(response.statistics)
    }
  }, [])

  const isLoaded = useMemo(() => {
    return (
      trendingAnimeStatus === 'success' ||
      popularityAnimeStatus === 'success' ||
      anonsAnimeStatus === 'success'
    )
  }, [trendingAnimeStatus, popularityAnimeStatus, anonsAnimeStatus])

  const isLoading = useMemo(() => {
    return (
      trendingAnimeStatus === 'loading' ||
      popularityAnimeStatus === 'loading' ||
      anonsAnimeStatus === 'loading'
    )
  }, [trendingAnimeStatus, popularityAnimeStatus, anonsAnimeStatus])

  return (
    <div className="flex h-full w-full justify-center items-center flex-col">
      <Helmet>
        <title>Tenshi - Главная</title>
        <meta
          name="description"
          content="Tenshi - ваш идеальный помощник для просмотра аниме, сохранения любимых аниме в списки и открытия новых шедевров. Смотрите бесплатно новинки аниме."
        />
        <link rel="canonical" href="/" />
      </Helmet>
      {isLoading ? (
        <TenshiSpinner />
      ) : (
        <>
          <Headline />
          <TrendingList isLoaded={isLoaded} animeList={trendingAnime} />
          <PopularityList isLoaded={isLoaded} animeList={popularityAnime} />
          <AnonsList isLoaded={isLoaded} animeList={anonsAnime} />
          {usersByLevel.length && usersByTomi.length && statistic && (
            <div className="flex w-full flex-col md:flex-row">
              <TopUsersBlock
                usersByLevel={usersByLevel}
                usersByPoints={usersByTomi}
              />
              <Statistic statistic={statistic} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default DashboardPage
