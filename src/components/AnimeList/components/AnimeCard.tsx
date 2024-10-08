import {
  Card,
  CardBody,
  Image,
  Divider,
  CardFooter,
  Button,
  CardHeader
} from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import { GenreType } from '../../../types/Shikimori/Responses/Types/Genre.type'
import sanitizeHTML from '../../../utils/Misc/sanitizeHTML'
import { getScoreBadgeColor } from '../../../utils/Misc/getScoreBadgeColor'
import ViewsIcon from '../../../assets/icons/views.svg?react'

interface Props {
  id: string
  image?: string
  title: string
  titleEn: string
  desc: string | null
  descHtml: string | null
  type: string | null
  episodes: number | null
  lastEpisode: number | null
  year?: number
  genres: GenreType[]
  timeEpisode: number | null
  score: number | null
  updateTime: string
  views: number
}

export default function AnimeCard({
  id,
  image,
  title,
  titleEn,
  desc,
  descHtml,
  type,
  episodes,
  lastEpisode,
  year,
  score,
  genres,
  updateTime,
  views
}: Props) {
  const formattedDate = useMemo(() => {
    return dayjs(updateTime).format('D MMMM YYYY')
  }, [updateTime])

  const formattedType = useMemo(() => {
    if (type === 'released') {
      return 'Завершено'
    } else if (type === 'ongoing') {
      return 'Выходит'
    } else if (type === 'anons') {
      return 'Анонс'
    } else {
      return 'Неизвестно'
    }
  }, [type])

  const formattedEpisodes = useMemo(() => {
    if (type === 'released') {
      return episodes
    }
    if (lastEpisode === 0) {
      return episodes
    } else {
      return episodes ? `${lastEpisode} из ${episodes}` : `${lastEpisode}`
    }
  }, [episodes, lastEpisode, type])

  const formattedDescription = useMemo(() => {
    if (desc) {
      return sanitizeHTML({
        color: '#eb5628',
        descriptionHtml: descHtml ? descHtml : ''
      })
    } else {
      return 'Описание временно отсутсвует'
    }
  }, [desc, descHtml])

  const formattedScore = useMemo(() => {
    return score ? score : 0
  }, [score])

  return (
    <Card className="border-none bg-background/60 dark:bg-default-100/50">
      <CardHeader className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-500">{formattedDate}</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
            {views}
            <ViewsIcon width={16} />
          </div>
          <div
            className={`flex items-center text-lg font-bold ${getScoreBadgeColor({ score: formattedScore })}`}
          >
            {formattedScore}
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex">
          <div>
            <Image
              alt="animePoster"
              className="object-cover h-auto w-full md:w-60 md:h-80"
              src={image}
            />
          </div>
          <div className="flex flex-col md:pl-4 flex-1">
            <h3 className={`font-medium hidden md:flex text-xl pb-2`}>
              <Link
                className="hover:text-[#eb5628] flex flex-col transition ease-in-out duration-150 cursor-pointer"
                to={`/anime/${id}`}
              >
                {title}
                <span className="text-sm font-medium text-gray-700">
                  {titleEn}
                </span>
              </Link>
            </h3>
            {/* Todo(medium): Сделать отсчет до новой серии  */}
            <div className="md:flex flex-col gap-1 pb-2 hidden">
              {year && (
                <div className="flex gap-1 items-end">
                  <span className="font-medium text-sm md:text-sm text-gray-500 dark:text-gray-300">
                    Год выхода:
                  </span>
                  <span className="font-bold text-sm md:text-sm">
                    <Link
                      className="text-[#eb5628] underline-offset-2 hover:underline transition ease-in-out duration-150 cursor-pointer"
                      to={`/anime/catalog?years=${year}`}
                    >
                      {year}
                    </Link>
                  </span>
                </div>
              )}
              {genres.length > 0 && (
                <div className="flex gap-1 items-center">
                  <span className="font-medium text-xs md:text-sm text-gray-500 dark:text-gray-300">
                    Жанр:
                  </span>
                  <span className="font-bold text-md">
                    {genres.map((genre) => (
                      <>
                        <Link
                          key={genre.name}
                          className="text-[#eb5628] underline-offset-2 hover:underline transition ease-in-out duration-150 cursor-pointer"
                          to={`/anime/catalog?genres=${genre.name}`}
                        >
                          {genre.russian}
                        </Link>
                        <span className="last:hidden">, </span>
                      </>
                    ))}
                  </span>
                </div>
              )}
              <div className="flex gap-1 items-center">
                <span className="font-medium text-xs md:text-sm text-gray-500 dark:text-gray-300">
                  Статус:
                </span>
                <span className="font-bold text-md">
                  <Link
                    className="text-[#eb5628] underline-offset-2 hover:underline transition ease-in-out duration-150 cursor-pointer"
                    to={`/anime/catalog?status=${type}`}
                  >
                    {formattedType}
                  </Link>
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <span className="font-medium text-xs md:text-sm text-gray-500 dark:text-gray-300">
                  Количество серий:
                </span>
                <span className="font-bold text-md">{formattedEpisodes}</span>
              </div>
            </div>
            <Divider className="min-w-full hidden md:flex" />
            <div
              className="font-normal text-sm pt-2 hidden md:flex"
              dangerouslySetInnerHTML={{
                __html: formattedDescription
              }}
            />
          </div>
        </div>
        <h3 className={`font-medium flex md:hidden text-xl pt-4`}>
          <Link
            className="hover:text-[#eb5628] transition ease-in-out duration-150 cursor-pointer"
            to={`/anime/${id}`}
          >
            {title}
          </Link>
        </h3>
      </CardBody>
      <CardFooter className="pt-0">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            {/* <Tooltip
              classNames={{
                content: ['text-white bg-[#F9585F]']
              }}
              content="Понравилось"
            >
              <Button
                isIconOnly
                className="text-default-900/60"
                radius="full"
                variant="light"
              >
                <IconHeart />
              </Button>
            </Tooltip>
            <Tooltip
              classNames={{
                content: ['text-white bg-[#03346E]']
              }}
              content="Не понравилось"
            >
              <Button
                isIconOnly
                className="text-default-900/60"
                radius="full"
                variant="light"
              >
                <IconHeartBroken />
              </Button>
            </Tooltip> */}
          </div>
          <div>
            <Link to={`/anime/${id}`}>
              <Button
                className="border-[#eb5628] text-[#eb5628] hover:!bg-[#eb5628] hover:text-white"
                variant="ghost"
              >
                Смотреть
              </Button>
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
