import AnimeTrendCard from '../AnimeTrendCard/AnimeTrendCard'
import SkeletonAnimeTrendCard from '../AnimeTrendCard/SkeletonAnimeTrendCard' // Импортируем новый компонент
import { AnimeType } from '../../types/Shikimori/Responses/Types/Anime.type'

import IconArrowRight from '../../assets/icons/arrow_right.svg?react'
import { Link } from 'react-router-dom'

interface Props {
  animeList: AnimeType[]
  isLoaded: boolean
}

const TrendingList = ({ animeList, isLoaded }: Props): JSX.Element => {
  return (
    <div className="flex w-full flex-col gap-3 pt-5 px-5">
      <Link to="/anime/catalog?order=popularity&years=2024&status=ongoing">
        <h2 className="group font-bold text-2xl flex gap-1 items-center hover:text-[#eb5628] transition ease-in-out duration-150 cursor-pointer">
          Популярные в этом сезоне{' '}
          <IconArrowRight className="group-hover:fill-[#eb5628]" />
        </h2>
      </Link>
      <div className="flex w-full gap-3 py-5 px-1 overflow-x-auto">
        {isLoaded
          ? animeList.map((anime) => (
              <div
                key={`trend-${anime.id}`}
                className="min-w-[200px] md:flex-1"
              >
                <AnimeTrendCard anime={anime} />
              </div>
            ))
          : Array.from({ length: 5 }).map(
              (
                _,
                index // Добавляем 5 скелетонов
              ) => (
                <div
                  key={`skeleton-${index}`}
                  className="min-w-[200px] md:flex-1"
                >
                  <SkeletonAnimeTrendCard />
                </div>
              )
            )}
      </div>
    </div>
  )
}

export default TrendingList
