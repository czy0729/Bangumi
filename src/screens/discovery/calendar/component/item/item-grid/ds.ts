/*
 * @Author: czy0729
 * @Date: 2022-09-01 14:07:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 15:34:00
 */
import { _, systemStore } from '@stores'
import { rc } from '@utils/dev'
import { Navigation, SubjectId } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'ItemGrid')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  hideScore: false as (typeof systemStore)['setting']['hideScore'],
  subjectId: 0 as SubjectId,
  name: '' as string,
  image: '' as string,
  score: '' as string | number,
  collection: '' as string,
  time: '2359' as string
}

export const HIT_SLOP = {
  top: _.device(2, 4),
  right: _.device(4, 4),
  bottom: _.device(10, 4),
  left: _.device(4, 4)
} as const
