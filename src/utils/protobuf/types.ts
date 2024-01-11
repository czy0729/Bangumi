/*
 * @Author: czy0729
 * @Date: 2023-12-09 00:44:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 18:04:18
 */
import { Item as ADVItem } from '@utils/subject/adv/types'
import { Item as AnimeItem } from '@utils/subject/anime/types'
import { Item as GameItem } from '@utils/subject/game/types'
import { Item as MangaItem } from '@utils/subject/manga/types'
import { BangumiData, SubjectId } from '@types'

export type DataAssets = 'bangumi-data' | 'anime' | 'manga' | 'game' | 'adv' | 'catalog'

export type Decode = <T extends DataAssets>(name: T) => Promise<any>

type CalalogItem = {
  i: SubjectId
  d: string
  t: string
  b?: number
  a?: number
  m?: number
  g?: number
  r?: number
}

type Data = {
  'bangumi-data': BangumiData
  anime: AnimeItem[]
  manga: MangaItem[]
  game: GameItem[]
  adv: ADVItem[]
  catalog: CalalogItem[]
}

export type Get = <T extends DataAssets>(name: T) => Data[T]
