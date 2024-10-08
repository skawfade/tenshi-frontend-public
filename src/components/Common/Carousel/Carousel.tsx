import { Carousel as CarouselTailwind } from '@material-tailwind/react'
import { AnimeType } from '../../../types/Shikimori/Responses/Types/Anime.type'
import { useCallback, useEffect, useState } from 'react'
import { Button, Chip, Link, Tooltip } from '@nextui-org/react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectUser } from '../../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { selectList, updateFavorite } from '../../../features/list/listSlice'

// Icons
import IconBookmarkFilled from '../../../assets/icons/bookmark_filled.svg?react'
import IconBookmark from '../../../assets/icons/bookmark.svg?react'
import { getScoreBadgeColor } from '../../../utils/Misc/getScoreBadgeColor'

interface Props {
  animes: AnimeType[]
}

export function Carousel({ animes }: Props) {
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0)
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const lists = useAppSelector(selectList)

  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreenshotIndex(
        (prevIndex) => (prevIndex + 1) % animes[0].screenshots.length
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [animes])

  const handleFavoriteClick = useCallback(
    (animeId: string) => {
      if (user) {
        dispatch(updateFavorite({ userId: user._id, animeId }))
      } else {
        navigate('/login')
      }
    },
    [user, dispatch, navigate]
  )

  const isFavorite = useCallback(
    (animeId: string) => {
      return lists ? lists?.favorites?.ids?.includes(animeId) : false
    },
    [lists]
  )

  return (
    <CarouselTailwind
      className="rounded-b-2xl overflow-hidden"
      placeholder={null}
      prevArrow={() => null}
      nextArrow={() => null}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      autoplay
      loop
      autoplayDelay={10000}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill('').map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? 'w-8 bg-[#eb5628]' : 'w-4 bg-white/50'
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {animes.map((anime, index) => (
        <div key={index} className="relative overflow-hidden">
          <img
            src={anime?.screenshots[activeScreenshotIndex].originalUrl} // Используем активный скриншот
            alt={`Anime ${index + 1}`}
            className="w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col pl-3 md:pl-11 pt-11 md:pt-32 bg-black bg-opacity-80">
            <h2 className="text-white font-bold text-lg md:text-5xl truncate">
              {anime.russian || anime.licenseNameRu || anime.name}
            </h2>{' '}
            {anime?.genres?.length > 0 && (
              <div className="pt-4 gap-2 flex flex-wrap">
                {anime.genres.map((genre) => (
                  <Chip
                    variant="flat"
                    className="text-white opacity-75"
                    classNames={{
                      base: "opacity-75 h-6 md:h-7",
                      content: "text-white px-1 md:px-2",
                    }}
                    key={genre.id}
                  >
                    {genre.russian}
                  </Chip>
                ))}
              </div>
            )} 
            <div className="pt-3 md:pt-10 flex items-center gap-4">
              <Button
                href={`/anime/${anime.id}`}
                as={Link}
                radius="full"
                className="bg-[#eb5628] text-white"
              >
                Подробнее
              </Button>
              <Tooltip
                classNames={{
                  content: ['text-white bg-[#eb5628]']
                }}
                content={
                  isFavorite(anime.id)
                    ? 'Удалить из избранного'
                    : 'Добавить в избранное'
                }
              >
                <Button
                  isIconOnly
                  className="text-default-900/60"
                  radius="full"
                  variant="light"
                  onClick={() => handleFavoriteClick(anime.id)}
                >
                  {isFavorite(anime.id) ? (
                    <IconBookmarkFilled fill="#FEC008" />
                  ) : (
                    <IconBookmark stroke="#ffffff" />
                  )}
                </Button>
              </Tooltip>
            </div>
          </div>
          {anime.score && (
            <div
              className={`absolute top-5 right-5 flex items-center text-2xl font-bold ${getScoreBadgeColor({ score: anime.score })}`}
            >
              {anime.score}
            </div>
          )}
        </div>
      ))}
    </CarouselTailwind>
  )
}
