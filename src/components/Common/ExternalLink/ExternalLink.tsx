import { ExternalLinkType } from '../../../types/Shikimori/Responses/Types/ExternalLink.type'
import { ExternalLinkEnum } from '../../../types/Shikimori/Responses/Enums/ExternalLink.enum'
import XIcon from '../../../assets/social/twitter.svg?react'
import KinopoiskIcon from '../../../assets/social/kinopoisk.svg?react'
import WikiIcon from '../../../assets/social/wikipedia.svg?react'
import MyAnimeListIcon from '../../../assets/social/myanimelist.svg?react'
import OfficialIcon from '../../../assets/icons/link.svg?react'

import './styles.css'

interface Props {
  link: ExternalLinkType
}

const iconMap: Partial<
  Record<
    ExternalLinkEnum,
    React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  >
> = {
  [ExternalLinkEnum.OfficialSite]: () => (
    <OfficialIcon width={32} className="z-10" />
  ), // Изменено
  [ExternalLinkEnum.Wikipedia]: () => <WikiIcon width={32} className="z-10" />, // Изменено
  [ExternalLinkEnum.MyAnimeList]: () => (
    <MyAnimeListIcon width={32} className="z-10" />
  ), // Изменено
  [ExternalLinkEnum.KinoPoisk]: () => (
    <KinopoiskIcon width={24} className="z-10" />
  ), // Изменено
  [ExternalLinkEnum.Twitter]: () => (
    <XIcon width={32} className="fill-[#ffffff] dark:fill-[#000000] z-10" />
  ) // Изменено
  // Добавьте остальные иконки здесь
}

const bgColorMap: Partial<Record<ExternalLinkEnum, string>> = {
  [ExternalLinkEnum.OfficialSite]: 'bg-gray-300',
  [ExternalLinkEnum.Wikipedia]: 'bg-gray-300',
  [ExternalLinkEnum.MyAnimeList]: 'bg-blue-700',
  [ExternalLinkEnum.KinoPoisk]: 'bg-black dark:bg-white', // Изменено
  [ExternalLinkEnum.Twitter]: 'bg-black dark:bg-white' // Изменено
  // Добавьте остальные цвета здесь
}

export function ExternalLink({ link }: Props) {
  const IconComponent = iconMap[link.kind] || null
  const bgColor = bgColorMap[link.kind] || null

  if (!IconComponent || !bgColor) {
    return null // Возвращаем null, если kind не найден
  }

  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer">
      <button className="Btn">
        <span className="svgContainer">
          <IconComponent />
        </span>
        <span className={`BG ${bgColor}`}></span>
      </button>
    </a>
  )
}
