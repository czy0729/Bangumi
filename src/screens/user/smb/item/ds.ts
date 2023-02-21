/*
 * @Author: czy0729
 * @Date: 2022-10-30 15:18:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-21 05:41:25
 */
import { Navigation, SubjectId } from '@types'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

type Subject = ReturnType<$['subjectV2']>

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  subjectId: 0 as SubjectId,
  loaded: false as Subject['_loaded'],
  jp: '' as Subject['jp'],
  cn: '' as Subject['cn'],
  image: '' as Subject['image'],
  type: '' as Subject['type'],
  eps: '' as number | '',
  air_date: '' as ReturnType<$['airDate']>,
  rank: 0 as Subject['rank'],
  rating: {} as Subject['rating'],
  collection: '' as string,
  folder: {} as any,
  smb: {} as any,
  url: (() => {}) as $['url']
}

export const SORT_ORDER = {
  folder: 110,
  video: 100,
  music: 90,
  pic: 80,
  zip: 70,
  origin: 11,
  file: 10
} as const
