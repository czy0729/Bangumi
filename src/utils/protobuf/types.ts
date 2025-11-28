/*
 * @Author: czy0729
 * @Date: 2023-12-09 00:44:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-28 13:49:36
 */
import type { Item as ADVFingerItem } from '@utils/subject/adv/types'
import type { Item as AnimeFingerItem } from '@utils/subject/anime/types'
import type { Item as GameFingerItem } from '@utils/subject/game/types'
import type { Item as MangaFingerItem } from '@utils/subject/manga/types'
import type { BangumiData, Id } from '@types'

export type DataAssets = 'bangumi-data' | 'anime' | 'manga' | 'game' | 'adv' | 'catalog'

export type Decode = <T extends DataAssets>(name: T) => Promise<any>

type CalalogFingerItem = {
  i: Id
  d: string
  l: string
  t: string
  a?: number
  b?: number
  m?: number
  g?: number
  r?: number
  ch?: number
  pe?: number
  to?: number
  bl?: number
  ep?: number
}

type Data = {
  'bangumi-data': BangumiData
  anime: AnimeFingerItem[]
  manga: MangaFingerItem[]
  game: GameFingerItem[]
  adv: ADVFingerItem[]
  catalog: CalalogFingerItem[]
}

export type Get = <T extends DataAssets>(name: T) => Data[T]
