import { Card, CardBody, Image, CardFooter } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { AnimeType } from '../../types/Shikimori/Responses/Types/Anime.type'

interface Props {
  anime: AnimeType
}

export default function AnimeTrendCard({ anime }: Props) {
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    navigate(`/anime/${anime.id}`)
  }, [anime, navigate])

  return (
    <Card shadow="sm" className="flex-1">
      <CardBody className="overflow-visible p-0 h-[240px]">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={anime?.russian || anime.name}
          className="w-full object-cover h-[240px]"
          src={anime.poster?.originalUrl}
        />
      </CardBody>

      <CardFooter className="text-small justify-start items-start flex flex-col gap-2 h-full min-h-28">
        <b
          onClick={handleClick}
          className="hover:text-[#eb5628] transition ease-in-out duration-150 cursor-pointer"
        >
          {anime.russian}
        </b>
        <p className="text-default-500 text-xs">{anime.japanese}</p>
      </CardFooter>
    </Card>
  )
}
