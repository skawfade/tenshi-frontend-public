import { Card, CardBody, Image } from '@nextui-org/react'

import { AnimeType } from '../../../types/Shikimori/Responses/Types/Anime.type'
import { useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface Props {
  anime: AnimeType
}
const AnimeCardSearch = ({ anime }: Props): JSX.Element => {
  const navigate = useNavigate()

  const handlePress = useCallback(() => {
    navigate(`/anime/${anime.id}`)
  }, [anime, navigate])

  const formattedStatus = useMemo(() => {
    if (anime?.status === 'released') {
      return 'Завершено'
    } else if (anime?.status === 'ongoing') {
      return 'Выходит'
    } else if (anime?.status === 'anons') {
      return 'Запланировано'
    } else {
      return 'Неизвестно'
    }
  }, [anime])

  const formattedEpisodes = useMemo(() => {
    if (anime.status === 'released') {
      return anime?.episodes
    }
    if (anime?.episodesAired === 0) {
      return anime?.episodes
    } else {
      return anime?.episodes
        ? `${anime?.episodesAired} из ${anime?.episodes}`
        : `${anime?.episodesAired}`
    }
  }, [anime])

  return (
    <Link to={`/anime/${anime.id}`}>
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 w-full h-[160px] min-h-[180px] cursor-pointer group transition ease-in-out duration-150"
        shadow="sm"
        isHoverable
        isPressable
        disableRipple
        onClick={handlePress}
      >
        <CardBody>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <Image
                alt={anime.id}
                className="object-cover min-w-[100px]"
                height={150}
                shadow="md"
                radius="sm"
                src={anime.poster?.originalUrl}
                width={100}
              />
            </div>
            <div className="flex flex-col h-full gap-1">
              <h3 className="font-medium flex text-base group-hover:text-[#eb5628] transition ease-in-out duration-150">
                <div className="flex flex-col">
                  {anime.russian || anime.licenseNameRu}
                </div>
              </h3>
              <div className="flex gap-1 items-end">
                <span className="font-medium text-xs text-gray-500 dark:text-gray-300">
                  Год выхода:
                </span>
                <span className="font-bold text-xs">
                  {anime.releasedOn?.year ||
                    anime.airedOn?.year ||
                    'Неизвестно'}
                </span>
              </div>
              {anime.genres.length > 0 && (
                <div className="flex gap-1 items-start">
                  <span className="font-medium text-xs text-gray-500 dark:text-gray-300">
                    Жанр:
                  </span>
                  <span className="font-bold text-xs">
                    {anime.genres.map((genre) => genre.russian).join(', ')}
                  </span>
                </div>
              )}
              <div className="flex gap-1 items-center">
                <span className="font-medium text-xs text-gray-500 dark:text-gray-300">
                  Статус:
                </span>
                <span className="font-bold text-xs">{formattedStatus}</span>
              </div>
              <div className="flex gap-1 items-center">
                <span className="font-medium text-xs text-gray-500 dark:text-gray-300">
                  Количество серий:
                </span>
                <span className="font-bold text-xs">{formattedEpisodes}</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}

export default AnimeCardSearch
