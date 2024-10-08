import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import AnimeList from '../../components/AnimeList/AnimeList'
import TenshiSpinner from '../../components/TenshiSpinner/TenshiSpinner'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  fetchAnime,
  resetState,
  selectAnimeList,
  selectAnimePagination,
  selectAnimeStatus
} from '../../features/animes/animesSlice'
import { AnimesType } from '../../types/Shikimori/Queries/Animes.type'
import { Helmet } from 'react-helmet-async'
import { Button } from '@nextui-org/react'
import SelectAnimeGenres from '../../components/Common/SelectAnimeGenres/SelectAnimeGenres'
import SelectAnimeYears from '../../components/Common/SelectAnimeYears/SelectAnimeYears'
import SelectAnimeStatus from '../../components/Common/SelectAnimeStatus/SelectAnimeStatus'
import SelectAnimeTypes from '../../components/Common/SelectAnimeTypes/SelectAnimeTypes'

import ClearFiltersIcon from '../../assets/icons/remove.svg?react'
import SelectAnimeOrder from '../../components/Common/SelectAnimeOrder/SelectAnimeOrder'
// Todo(low): Рефакторинг импортов

const AnimeListPage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const animeList = useAppSelector(selectAnimeList)
  const animeStatus = useAppSelector(selectAnimeStatus)
  const pagination = useAppSelector(selectAnimePagination)

  // Для фильтров
  const [genresSelected, setGenresSelected] = useState<Set<string>>(new Set([]))
  const [yearsSelected, setYearsSelected] = useState<Set<string>>(new Set([]))
  const [statusSelected, setStatusSelected] = useState<Set<string>>(new Set([]))
  const [typesSelected, setTypesSelected] = useState<Set<string>>(new Set([]))

  const [order, setOrder] = useState<Set<string>>(new Set(['popularity']))

  const navigate = useNavigate()
  const location = useLocation()

  const handleGenresFilterChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value === '') {
        setGenresSelected(new Set([]))
      } else {
        setGenresSelected(new Set(e.target.value.split(',')))
      }
    },
    []
  )

  const handleOrderFilterChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value === '') {
        setOrder(new Set([]))
      } else {
        setOrder(new Set(e.target.value.split(',')))
      }
    },
    []
  )

  const handleTypesFilterChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value === '') {
        setTypesSelected(new Set([]))
      } else {
        setTypesSelected(new Set(e.target.value.split(',')))
      }
    },
    []
  )

  const handleYearsFilterChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value === '') {
        setYearsSelected(new Set([]))
      } else {
        setYearsSelected(new Set(e.target.value.split(',')))
      }
    },
    []
  )

  const handleStatusFilterChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value === '') {
        setStatusSelected(new Set([]))
      } else {
        setStatusSelected(new Set(e.target.value.split(',')))
      }
    },
    []
  )

  const handleTypesFilterClear = useCallback(() => {
    const params = new URLSearchParams(location.search)

    params.delete('kind')
    setTypesSelected(new Set([]))
    navigate(`?${params.toString()}`)
  }, [location.search, navigate])

  const handleGenresFilterClear = useCallback(() => {
    const params = new URLSearchParams(location.search)

    params.delete('genres')
    setGenresSelected(new Set([]))
    navigate(`?${params.toString()}`)
  }, [location.search, navigate])

  const handleYearsFilterClear = useCallback(() => {
    const params = new URLSearchParams(location.search)

    params.delete('years')
    setYearsSelected(new Set([]))
    navigate(`?${params.toString()}`)
  }, [location.search, navigate])

  const handleStatusFilterClear = useCallback(() => {
    const params = new URLSearchParams(location.search)

    params.delete('status')
    setStatusSelected(new Set([]))
    navigate(`?${params.toString()}`)
  }, [location.search, navigate])

  const handleFilterSubmit = useCallback(() => {
    const params = new URLSearchParams(location.search)

    if (order.size !== 0) {
      params.set('order', Array.from(order).join(''))
    } else {
      params.delete('page')
      params.delete('order')
    }

    if (genresSelected.size !== 0) {
      params.set('genres', Array.from(genresSelected).join(','))
    } else {
      params.delete('page')
      params.delete('genres')
    }

    if (yearsSelected.size !== 0) {
      params.set('years', Array.from(yearsSelected).join(','))
    } else {
      params.delete('page')
      params.delete('years')
    }

    if (statusSelected.size !== 0) {
      params.set('status', Array.from(statusSelected).join(','))
    } else {
      params.delete('page')
      params.delete('status')
    }

    if (typesSelected.size !== 0) {
      params.set('kind', Array.from(typesSelected).join(','))
    } else {
      params.delete('page')
      params.delete('kind')
    }

    navigate(`?${params.toString()}`)
  }, [
    genresSelected,
    location.search,
    navigate,
    order,
    statusSelected,
    typesSelected,
    yearsSelected
  ])

  const handleClearFiltersSubmit = useCallback(() => {
    const params = new URLSearchParams(location.search)
    params.delete('page')
    params.delete('genres')
    params.delete('years')
    params.delete('status')
    params.delete('kind')

    navigate(`?${params.toString()}`)
  }, [location.search, navigate])

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(location.search)
    params.set('page', page.toString())
    navigate(`?${params.toString()}`)
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const page = parseInt(params.get('page') || '1', 10)
    const genres = params.get('genres')
    const years = params.get('years')
    const status = params.get('status')
    const kind = params.get('kind')
    const order = params.get('order')

    const paramsQuery: AnimesType = {
      limit: 15,
      order: order ? order : 'popularity',
      filter:
        'id,name,russian,japanese,status,score,genres,poster,episodes,episodesAired,description,descriptionHtml,updatedAt,releasedOn,airedOn,views',
      page: page
    }

    if (genres) {
      setGenresSelected(new Set(genres.split(',')))
      paramsQuery.genre = genres
    } else {
      setGenresSelected(new Set([]))
    }

    if (years) {
      setYearsSelected(new Set(years.split(',')))
      paramsQuery.year = years
    } else {
      setYearsSelected(new Set([]))
    }

    if (status) {
      setStatusSelected(new Set(status.split(',')))
      paramsQuery.status = status
    } else {
      setStatusSelected(new Set([]))
    }

    if (kind) {
      setTypesSelected(new Set(kind.split(',')))
      paramsQuery.kind = kind
    } else {
      setTypesSelected(new Set([]))
    }

    dispatch(fetchAnime(paramsQuery))
    window.scrollTo(0, 0)

    return () => {
      dispatch(resetState())
    }
  }, [dispatch, location.search])

  const currentPage = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const page = parseInt(params.get('page') || '1', 10)
    return page
  }, [location.search])

  const isDisabledClearFilters = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return (
      !params.get('genres') &&
      !params.get('years') &&
      !params.get('status') &&
      !params.get('kind')
    )
  }, [location.search])

  return (
    <div className="flex h-full flex-col">
      <Helmet title="Tenshi - Каталог" />
      <Helmet>
        <title>Tenshi - Каталог</title>
        <meta
          name="description"
          content="Исследуйте наш обширный каталог аниме. Найдите свои любимые аниме и откройте для себя новые шедевры!"
        />
        <link rel="canonical" href="/anime/catalog" />
      </Helmet>
      <div className="w-full p-6 pb-0">
        <div className="flex items-center gap-3">
          <h4 className="text-large font-bold">Фильтры</h4>
          <div className="flex items-center gap-2">
            <Button
              color="primary"
              size="sm"
              radius="sm"
              className="bg-[#eb5628] text-white"
              onClick={handleFilterSubmit}
            >
              Применить
            </Button>
            <Button
              size="sm"
              radius="sm"
              className='bg-[#C71C18]'
              isIconOnly
              isDisabled={isDisabledClearFilters}
              onClick={handleClearFiltersSubmit}
            >
              <ClearFiltersIcon />
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 py-2 sm:flex-wrap">
          <SelectAnimeGenres
            selectedValues={genresSelected}
            onChange={handleGenresFilterChange}
            onClear={handleGenresFilterClear}
            isLoading={animeStatus === 'loading'}
          />
          <SelectAnimeYears
            selectedValues={yearsSelected}
            onChange={handleYearsFilterChange}
            onClear={handleYearsFilterClear}
            isLoading={animeStatus === 'loading'}
          />
          <SelectAnimeStatus
            selectedValues={statusSelected}
            onChange={handleStatusFilterChange}
            onClear={handleStatusFilterClear}
            isLoading={animeStatus === 'loading'}
          />
          <SelectAnimeTypes
            selectedValues={typesSelected}
            onChange={handleTypesFilterChange}
            onClear={handleTypesFilterClear}
            isLoading={animeStatus === 'loading'}
          />
          <SelectAnimeOrder
            selectedValues={order}
            onChange={handleOrderFilterChange}
            isLoading={animeStatus === 'loading'}
          />
        </div>
      </div>
      {animeStatus === 'loading' ? (
        <div className="flex w-full pt-10 items-center justify-center">
          <TenshiSpinner />
        </div>
      ) : animeList.length === 0 ? (
        <div className="text-4xl font-bold">Ничего не найдено</div>
      ) : (
        <AnimeList
          onPageChange={handlePageChange}
          animeList={animeList}
          currentPage={currentPage}
          total={pagination?.totalPages}
          hasPagination
        />
      )}
    </div>
  )
}

export default AnimeListPage
