import { useCallback, useEffect, useMemo } from 'react'
import TenshiSpinner from '../../components/TenshiSpinner/TenshiSpinner'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import {
  fetchAnimeFranchise,
  fetchAnimeTitle,
  resetAnimeTitleState,
  selectAnimeFranchise,
  selectAnimeTitle,
  selectAnimeTitleStatus
} from '../../features/animeTitle/animeTitleSlice'
import {
  Accordion,
  AccordionItem,
  Button,
  Divider,
  Image,
  Link,
  Select,
  SelectItem,
  Tooltip
} from '@nextui-org/react'
import Video from '../../components/VideoPlayer/Video'
import sanitizeHTML from '../../utils/Misc/sanitizeHTML'
import { getScoreBadgeColor } from '../../utils/Misc/getScoreBadgeColor'
import dayjs from 'dayjs'
import { Helmet } from 'react-helmet-async'
import IconLink from '../../assets/icons/link.svg?react'
import { selectUser } from '../../features/user/userSlice'
import {
  getList,
  selectList,
  selectListUpdateStatus,
  updateFavorite,
  updateList
} from '../../features/list/listSlice'

import { Link as RouteLink } from 'react-router-dom'

// Icons
import IconBookmarkFilled from '../../assets/icons/bookmark_filled.svg?react'
import IconBookmark from '../../assets/icons/bookmark.svg?react'
import ViewsIcon from '../../assets/icons/views.svg?react'

import API from '../../api/config'
import RatingBlock from '../../components/Common/RatingBlock/RatingBlock'
import { toast } from 'react-toastify'
import { ExternalLink } from '../../components/Common/ExternalLink/ExternalLink'
import { ExternalLinkEnum } from '../../types/Shikimori/Responses/Enums/ExternalLink.enum'
import CommentsBlock from '../../components/CommentsBlock/CommentsBlock'

const LISTS_OPTIONS = [
  { id: 2, name: 'Просмотренное' },
  { id: 3, name: 'Смотрю' },
  { id: 4, name: 'Запланировано' }
]

const AnimePage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const animeTitle = useAppSelector(selectAnimeTitle)
  const animeFranchise = useAppSelector(selectAnimeFranchise)
  const animeTitleStatus = useAppSelector(selectAnimeTitleStatus)
  const user = useAppSelector(selectUser)
  const lists = useAppSelector(selectList)
  const listUpdateStatus = useAppSelector(selectListUpdateStatus)

  const { id } = useParams<{ id: string }>()

  const handleFavoriteClick = useCallback(() => {
    if (user && animeTitle) {
      dispatch(updateFavorite({ userId: user._id, animeId: animeTitle.id }))
    } else {
      navigate('/login')
    }
  }, [user, animeTitle, dispatch, navigate])

  const handleSelectionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (user) {
        if (e.target.value && animeTitle) {
          dispatch(
            updateList({
              userId: user._id,
              animeId: animeTitle.id,
              listId: Number(e.target.value)
            })
          )
        }
      } else {
        navigate('/login')
      }
    },
    [animeTitle, dispatch, navigate, user]
  )

  const loadAnimeTitle = useCallback(() => {
    if (id) {
      dispatch(fetchAnimeTitle(id))
    }
  }, [dispatch, id])

  const handleRateAnimeClick = useCallback(
    (rating: number) => {
      if (animeTitle?.id && user) {
        const payload = {
          userId: user._id,
          animeId: animeTitle.id,
          newRating: rating
        }
        API.request(`animes/rate`, 'POST', payload).then((response) => {
          dispatch({
            type: 'animeTitle/updateRating',
            payload: { anime: response.anime }
          })
        })
      } else {
        toast('Оценивать аниме могут только зарегистрированные пользователи', {
          type: 'error'
        })
      }
    },
    [animeTitle?.id, dispatch, user]
  )

  const isFavorite = useMemo(() => {
    return lists && animeTitle
      ? lists?.favorites?.ids?.includes(animeTitle.id)
      : false
  }, [lists, animeTitle])

  const listId = useMemo(() => {
    if (animeTitle) {
      if (!lists) return ''
      if (lists.watched?.ids?.includes(animeTitle.id)) return '2'
      if (lists.watching?.ids?.includes(animeTitle.id)) return '3'
      if (lists.planned?.ids?.includes(animeTitle.id)) return '4'
    }
    return ''
  }, [animeTitle, lists])

  useEffect(() => {
    loadAnimeTitle()
    if (user) {
      dispatch(getList(user?._id))
    }

    return () => {
      dispatch(resetAnimeTitleState())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (animeTitle?.id) {
      API.request(`animes/anime/${animeTitle?.id}/views`, 'PUT')
    }
  }, [animeTitle?.id])

  useEffect(() => {
    if (animeTitle?.franchise) {
      dispatch(fetchAnimeFranchise(animeTitle.franchise))
    }
  }, [animeTitle, dispatch])

  const isLoading = useMemo(() => {
    return animeTitleStatus === 'loading'
  }, [animeTitleStatus])

  const formattedType = useMemo(() => {
    if (animeTitle?.status === 'released') {
      return 'Завершено'
    } else if (animeTitle?.status === 'ongoing') {
      return 'Выходит'
    } else if (animeTitle?.status === 'anons') {
      return 'Анонс'
    } else {
      return 'Неизвестно'
    }
  }, [animeTitle])

  const formattedEpisodes = useMemo(() => {
    if (animeTitle?.status === 'released') {
      return animeTitle?.episodes
    }
    if (animeTitle?.episodesAired === 0) {
      return animeTitle?.episodes
    } else {
      return animeTitle?.episodes
        ? `${animeTitle?.episodesAired} из ${animeTitle?.episodes}`
        : `${animeTitle?.episodesAired}`
    }
  }, [animeTitle])

  const formattedDescription = useMemo(() => {
    if (animeTitle?.description) {
      return sanitizeHTML({
        color: '#eb5628',
        descriptionHtml: animeTitle?.descriptionHtml
          ? animeTitle?.descriptionHtml
          : ''
      })
    } else {
      return 'Описание временно отсутсвует'
    }
  }, [animeTitle])

  const formattedScore = useMemo(() => {
    return animeTitle?.score ? animeTitle.score : 0
  }, [animeTitle])

  const formattedDate = useMemo(() => {
    return dayjs(animeTitle?.updatedAt).format('D MMMM YYYY')
  }, [animeTitle])

  const formattedScreenshots = useMemo(() => {
    if (animeTitle?.screenshots && animeTitle.screenshots.length > 2) {
      return animeTitle.screenshots.slice(0, 3)
    } else {
      return null
    }
  }, [animeTitle])

  const formattedExternalLinks = useMemo(() => {
    if (animeTitle?.externalLinks) {
      const supportedKinds = [
        ExternalLinkEnum.OfficialSite,
        ExternalLinkEnum.Wikipedia,
        ExternalLinkEnum.MyAnimeList,
        ExternalLinkEnum.KinoPoisk,
        ExternalLinkEnum.Twitter
      ]

      const filteredLinks = animeTitle?.externalLinks.filter((link) =>
        supportedKinds.includes(link.kind)
      )

      const wikipediaLinks = filteredLinks.filter(
        (link) => link.kind === ExternalLinkEnum.Wikipedia
      )
      const ruLink = wikipediaLinks.find((link) =>
        link.url.includes('ru.wikipedia.org')
      )
      const enLink = wikipediaLinks.find((link) =>
        link.url.includes('en.wikipedia.org')
      )
      const jpLink = wikipediaLinks.find((link) =>
        link.url.includes('ja.wikipedia.org')
      )

      const finalWikipediaLink = ruLink || enLink || jpLink

      const uniqueLinks = filteredLinks.filter(
        (link) => link.kind !== ExternalLinkEnum.Wikipedia
      )
      if (finalWikipediaLink) {
        uniqueLinks.push(finalWikipediaLink)
      }

      return uniqueLinks
    }
    return []
  }, [animeTitle])

  const scoreTenshi = useMemo(() => {
    return Number((animeTitle?.scoreTenshi.totalScore || 0).toFixed(1))
  },[animeTitle?.scoreTenshi.totalScore])

  return (
    <div className="flex h-full flex-col p-6 pt-0">
      {isLoading ? (
        <div className="flex h-full w-full justify-center items-center">
          <TenshiSpinner />
        </div>
      ) : (
        <div className="flex flex-col">
          <Helmet>
            <title>{`${animeTitle?.russian || animeTitle?.licenseNameRu || 'Tenshi - анимe'}`}</title>
            <meta
              name="description"
              content="Смотрите аниме в своей любимой озвучке"
            />
            <link rel="canonical" href={`/anime/${animeTitle?.id}`} />
          </Helmet>
          <div className="flex items-center justify-between w-full py-3">
            <div className="text-sm font-medium text-gray-500">
              {formattedDate}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                {animeTitle?.views}
                <ViewsIcon width={16} />
              </div>
              <div
                className={`flex items-center text-lg font-bold ${getScoreBadgeColor({ score: formattedScore })}`}
              >
                {formattedScore}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <h1 className="font-bold text-xl pb-2 flex flex-col md:hidden">
              {animeTitle?.russian}
              <span className="text-base font-medium text-gray-700">
                {animeTitle?.japanese}
              </span>
            </h1>
            <div className="float-left h-auto w-full flex gap-4 flex-col md:w-60">
              <Image
                alt="Album cover"
                className="object-cover min-w-60"
                src={animeTitle?.poster?.originalUrl}
              />
              <div className="flex">
                <Tooltip
                  classNames={{
                    content: ['text-white bg-[#eb5628]']
                  }}
                  content={
                    isFavorite
                      ? 'Удалить из избранного'
                      : 'Добавить в избранное'
                  }
                >
                  <Button
                    isIconOnly
                    className="text-default-900/60"
                    radius="full"
                    variant="light"
                    onClick={handleFavoriteClick}
                  >
                    {isFavorite ? (
                      <IconBookmarkFilled color="#FEC008" />
                    ) : (
                      <IconBookmark />
                    )}
                  </Button>
                </Tooltip>
                <Select
                  variant="flat"
                  placeholder="Добавить в список"
                  selectedKeys={[listId]}
                  className="max-w-full min-w-[192px] md:max-w-xs"
                  onChange={handleSelectionChange}
                  isDisabled={listUpdateStatus === 'loading'}
                >
                  {LISTS_OPTIONS.map((list) => (
                    <SelectItem key={list.id}>{list.name}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex flex-col pl-0 md:pl-4  flex-1">
              <RatingBlock
                rateTotal={animeTitle?.scoreTenshi.totalRatings || 0}
                initialRating={scoreTenshi}
                onRate={handleRateAnimeClick}
              />
              <h1 className={`font-bold text-2xl pb-2 hidden flex-col md:flex`}>
                {animeTitle?.russian}
                <span className="text-base font-medium text-gray-700">
                  {animeTitle?.japanese}
                </span>
              </h1>
              <div className="flex flex-col gap-1 pb-2 pt-3 md:pt-0">
                <div className="flex gap-1 items-center">
                  <span className="font-medium text-base md:text-sm text-gray-500 dark:text-gray-300">
                    Год выхода:
                  </span>
                  <span className="font-bold text-md">
                    <RouteLink
                      className="text-[#eb5628] underline-offset-2 hover:underline transition ease-in-out duration-150 cursor-pointer"
                      to={`/anime/catalog?years=${animeTitle?.airedOn?.year}`}
                    >
                      {animeTitle?.airedOn?.year}
                    </RouteLink>
                  </span>
                </div>
                {animeTitle && animeTitle.genres.length > 0 && (
                  <div className="flex gap-1 items-center">
                    <span className="font-medium text-base md:text-sm text-gray-500 dark:text-gray-300">
                      Жанр:
                    </span>
                    <span className="font-bold text-md">
                      {animeTitle.genres.map((genre) => (
                        <>
                          <RouteLink
                            key={genre.name}
                            className="text-[#eb5628] underline-offset-2 hover:underline transition ease-in-out duration-150 cursor-pointer"
                            to={`/anime/catalog?genres=${genre.name}`}
                          >
                            {genre.russian}
                          </RouteLink>
                          <span className="last:hidden">, </span>
                        </>
                      ))}
                    </span>
                  </div>
                )}
                <div className="flex gap-1 items-center">
                  <span className="font-medium text-base md:text-sm text-gray-500 dark:text-gray-300">
                    Статус:
                  </span>
                  <span className="font-bold text-md">
                    <RouteLink
                      className="text-[#eb5628] underline-offset-2 hover:underline transition ease-in-out duration-150 cursor-pointer"
                      to={`/anime/catalog?status=${animeTitle?.status}`}
                    >
                      {formattedType}
                    </RouteLink>
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <span className="font-medium text-base md:text-sm text-gray-500 dark:text-gray-300">
                    Количество серий:
                  </span>
                  <span className="font-bold text-md">{formattedEpisodes}</span>
                </div>
                {formattedExternalLinks.length > 0 && (
                  <div className="flex gap-2 py-2 items-center">
                    {formattedExternalLinks.map((link) => (
                      <ExternalLink key={link.id} link={link} />
                    ))}
                  </div>
                )}
              </div>
              <Divider className="min-w-full hidden md:flex" />
              <div
                className="font-normal text-sm md:text-base pt-0 md:pt-2 hidden md:flex"
                dangerouslySetInnerHTML={{
                  __html: formattedDescription
                }}
              />
              {animeFranchise.length > 1 && (
                <div className="pt-4">
                  <Accordion variant="shadow" className="rounded-lg" isCompact>
                    <AccordionItem
                      key="related"
                      aria-label="related"
                      indicator={<IconLink />}
                      title="Смотрите так же:"
                      className="flex flex-col gap-2"
                    >
                      {animeFranchise?.map((anime, index) => (
                        <Link
                          href={`/anime/${anime.id}`}
                          key={anime.id}
                          className="flex text-[#eb5628]"
                        >
                          {index + 1}. {anime.russian || anime.licenseNameRu}
                        </Link>
                      ))}
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </div>
          </div>
          <div
            className="font-normal text-sm pt-4 md:hidden"
            dangerouslySetInnerHTML={{
              __html: formattedDescription
            }}
          />
          {formattedScreenshots && (
            <div className="pt-11 gap-4 flex flex-col">
              <h2 className="font-bold text-xl">Кадры</h2>
              <div className="flex flex-col md:flex-row gap-4">
                {formattedScreenshots.map((screenshot, index) => (
                  <Image
                    isZoomed
                    key={`Screenshot ${index + 1}`}
                    alt={`Screenshot ${index + 1}`}
                    className="object-cover"
                    src={screenshot.originalUrl}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="pt-12 gap-4 flex flex-col">
            <h2 className="font-bold text-xl">Смотреть</h2>
            {animeTitle && <Video shikiId={animeTitle.id} />}
          </div>
          {animeTitle && <CommentsBlock animeId={animeTitle.id} />}
        </div>
      )}
    </div>
  )
}

export default AnimePage
