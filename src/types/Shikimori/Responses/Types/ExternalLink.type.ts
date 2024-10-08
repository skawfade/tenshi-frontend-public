import { ExternalLinkEnum } from '../Enums/ExternalLink.enum'

export type ExternalLinkType = {
  id: string | null
  kind: ExternalLinkEnum
  url: string
  createdAt: string | null
  updatedAt: string | null
}
