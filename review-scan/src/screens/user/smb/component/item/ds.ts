/*
 * @Author: czy0729
 * @Date: 2022-10-30 15:18:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 22:47:46
 */
import { rc } from '@utils/dev'
import { Navigation, SubjectId } from '@types'
import { SMBListItem, StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Item')

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
  folder: {} as SMBListItem,
  merge: [] as SMBListItem[]
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
