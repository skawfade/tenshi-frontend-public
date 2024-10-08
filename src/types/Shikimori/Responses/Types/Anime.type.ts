import { StatusType } from '../../General/Status.type'
import { AnimeKindEnum } from '../Enums/AnimeKind.enum'
import { IncompleteDateType } from '../Types/IncompleteDate.type'
import { CharacterRoleType } from '../Types/CharacterRole.type'
import { ExternalLinkType } from '../Types/ExternalLink.type'
// import { GenreType } from '../Types/Genre.type'
import { PersonRoleType } from '../Types/PersonRole.type'
import { PosterType } from '../Types/Poster.type'
import { AnimeRatingEnum } from '../Enums/AnimeRating.enum'
import { RelatedType } from '../Types/Related.type'
import { ScoreStatType } from '../Types/ScoreStat.type'
import { ScreenshotType } from '../Types/Screenshot.type'
import { StatusStatType } from '../Types/StatusStat.type'
import { StudioType } from '../Types/Studio.type'
import { TopicType } from '../Types/Topic.type'
import { UserRateType } from '../Types/UserRate.type'
import { VideoType } from '../Types/Video.type'
import { GenreType } from './Genre.type'

export type AnimeType = {
  airedOn: IncompleteDateType | null
  characterRoles: CharacterRoleType[]
  createdAt: string
  description: string | null
  descriptionHtml: string | null
  descriptionSource: string | null
  duration: number | null
  english: string | null
  episodes: number
  episodesAired: number
  externalLinks: ExternalLinkType[]
  fandubbers: string[]
  fansubbers: string[]
  franchise: string | null
  genres: GenreType[]
  id: string
  isCensored: boolean | null
  japanese: string | null
  kind: AnimeKindEnum | null
  licenseNameRu: string | null
  licensors: string[]
  malId: string | null
  name: string
  nextEpisodeAt: string | null
  personRoles: PersonRoleType[]
  poster: PosterType | null
  rating: AnimeRatingEnum | null
  related: RelatedType[]
  releasedOn: IncompleteDateType | null
  russian: string | null
  score: number | null
  scoresStats: ScoreStatType[]
  screenshots: ScreenshotType[]
  season: string | null
  status: StatusType | null
  statusesStats: StatusStatType[]
  studios: StudioType[]
  synonyms: string[]
  synopsis?: string
  topic: TopicType | null
  updatedAt: string
  url: string
  userRate: UserRateType | null
  videos: VideoType[]
  views: number
  scoreTenshi: ScoreTenshi
}
