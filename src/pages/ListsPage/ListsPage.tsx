import { Chip, Tab, Tabs } from '@nextui-org/react'
import { LISTS_TABS } from '../../constants/lists'
import TenshiSpinner from '../../components/TenshiSpinner/TenshiSpinner'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchAnime,
  resetState,
  selectAnimeList,
  selectAnimePagination,
  selectAnimeStatus
} from '../../features/animes/animesSlice'
import AnimeList from '../../components/AnimeList/AnimeList'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { selectList, selectListStatus } from '../../features/list/listSlice'
import { Helmet } from 'react-helmet-async'
import { Key } from '@react-types/shared'
import { useNavigate } from 'react-router-dom'

const ListsPage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const animeList = useAppSelector(selectAnimeList)
  const pagination = useAppSelector(selectAnimePagination)
  const lists = useAppSelector(selectList)
  const animeStatus = useAppSelector(selectAnimeStatus)
  const listStatus = useAppSelector(selectListStatus)

  const navigate = useNavigate()

  const [selectedTab, setSelectedTab] = useState<Key>(LISTS_TABS[0].value)

  const handleTabChange = useCallback(
    (key: Key) => {
      const params = new URLSearchParams(location.search)
      params.delete('page')
      navigate(`?${params.toString()}`)
      setSelectedTab(key)
    },
    [navigate]
  )

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const page = parseInt(params.get('page') || '1', 10)
    if (lists) {
      const selectedList = lists[selectedTab as keyof typeof lists]
      if (selectedList?.ids?.length > 0) {
        dispatch(
          fetchAnime({
            ids: selectedList?.ids?.join(','),
            limit: 15,
            page,
            filter:
              'id,name,russian,japanese,status,score,genres,poster,episodes,episodesAired,description,descriptionHtml,updatedAt,releasedOn,airedOn'
          })
        )
      } else {
        dispatch(resetState())
      }
    }
  }, [selectedTab, lists, dispatch])

  const reversedAnimes = useMemo(() => {
    return [...animeList].reverse()
  }, [animeList])

  const getCountById = useCallback(
    (listId: number) => {
      if (lists) {
        if (listId === 1) return lists.favorites?.count
        if (listId === 2) return lists.watched?.count
        if (listId === 3) return lists.watching?.count
        if (listId === 4) return lists.planned?.count
      }
      return 0
    },
    [lists]
  )

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(location.search)
    params.set('page', page.toString())
    navigate(`?${params.toString()}`)
  }

  const totalPages = useMemo(() => {
    return pagination?.totalPages || 1
  }, [pagination])

  const currentPage = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const page = parseInt(params.get('page') || '1', 10)
    return page
  }, [])

  return (
    <div className="flex w-full h-full flex-col p-6">
      <Helmet>
        <title>Tenshi - Списки аниме</title>
        <meta
          name="description"
          content="Управляйте своими любимыми аниме с помощью списков. Сохраняйте, сортируйте и открывайте новые шедевры анимации в одном месте."
        />
        <link rel="canonical" href="/profile/lists" />
      </Helmet>
      <h1 className="text-3xl font-bold">Ваши списки</h1>
      <div className="pt-4">
        <Tabs
          size="md"
          variant="solid"
          selectedKey={selectedTab}
          onSelectionChange={handleTabChange}
          fullWidth
          aria-label="tab"
        >
          {LISTS_TABS.map((tab, index) => (
            <Tab
              key={tab.value}
              title={
                <div className="flex justify-center items-center gap-2">
                  {tab.label}
                  <Chip variant="flat" size="sm">
                    {getCountById(index + 1)}
                  </Chip>
                </div>
              }
            >
              {animeStatus === 'loading' || listStatus === 'loading' ? (
                <div className="flex w-full pt-10 items-center justify-center">
                  <TenshiSpinner />
                </div>
              ) : animeList?.length === 0 ? (
                <div className="text-4xl font-bold w-full h-full flex justify-center items-center">
                  Ничего нет
                </div>
              ) : (
                <>
                  <AnimeList
                    animeList={reversedAnimes}
                    hasPagination
                    onPageChange={handlePageChange}
                    total={totalPages}
                    currentPage={currentPage}
                  />
                </>
              )}
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default ListsPage
