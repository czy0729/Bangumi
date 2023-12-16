/*
 * @Author: czy0729
 * @Date: 2023-12-09 00:44:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-13 01:32:42
 */
import { Item as AnimeItem } from '@utils/subject/anime/types'
import { BangumiData } from '@types'

export type DataAssets = 'bangumi-data' | 'anime'

export type Decode = <T extends DataAssets>(name: T) => Promise<any>

export type Get = <T extends DataAssets>(
  name: T
) => T extends 'bangumi-data' ? BangumiData : T extends 'anime' ? AnimeItem[] : null
