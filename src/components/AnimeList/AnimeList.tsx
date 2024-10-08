import { Pagination } from '@nextui-org/react'

import AnimeCard from './components/AnimeCard'
import { AnimeType } from '../../types/Shikimori/Responses/Types/Anime.type'

interface Props {
  animeList: AnimeType[]
  currentPage?: number
  hasPagination: boolean
  total?: number
  onPageChange?: (page: number) => void
}

const AnimeList = ({
  animeList,
  hasPagination,
  total,
  currentPage = 1,
  onPageChange
}: Props): JSX.Element => {

  return (
    <div className="w-full p-6 flex flex-col gap-3">
      {animeList.map((anime) => (
        <AnimeCard
          key={anime.id}
          id={anime.id}
          title={anime.russian || anime.name}
          titleEn={anime.japanese || anime.english || anime.name}
          image={anime.poster?.originalUrl || anime.poster?.mainUrl}
          descHtml={anime.descriptionHtml}
          desc={anime.description}
          type={anime.status || anime.kind}
          lastEpisode={anime.episodesAired}
          episodes={anime.episodes}
          score={anime.score}
          year={anime.airedOn?.year || anime.releasedOn?.year}
          genres={anime.genres}
          timeEpisode={anime.duration}
          updateTime={anime.updatedAt}
          views={anime.views}
        />
      ))}
      {hasPagination && total && (
        <div className="flex justify-center w-full">
          <Pagination
            className="pt-3 sticky bottom-5"
            classNames={{
              cursor: 'bg-[#eb5628]'
            }}
            showControls
            total={total}
            initialPage={currentPage}
            onChange={onPageChange}
          />
        </div>
      )}
    </div>
  )
}

export default AnimeList
