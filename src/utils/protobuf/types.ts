/*
 * @Author: czy0729
 * @Date: 2023-12-09 00:44:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-19 00:17:35
 */
import { Item as AnimeItem } from '@utils/subject/anime/types'
import { Item as MangaItem } from '@utils/subject/manga/types'
import { Item as GameItem } from '@utils/subject/game/types'
import { Item as ADVItem } from '@utils/subject/adv/types'
import { BangumiData } from '@types'

export type DataAssets = 'bangumi-data' | 'anime' | 'manga' | 'game' | 'adv'

export type Decode = <T extends DataAssets>(name: T) => Promise<any>

type Data = {
  'bangumi-data': BangumiData
  anime: AnimeItem[]
  manga: MangaItem[]
  game: GameItem[]
  adv: ADVItem[]
}

export type Get = <T extends DataAssets>(name: T) => Data[T]
