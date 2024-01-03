/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:03:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 11:38:35
 */
import { _, systemStore } from '@stores'
import { rc } from '@utils/dev'
import { Navigation } from '@types'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Series')

export const COMPONENT_MAIN = rc(COMPONENT)

export const COVER_WIDTH = _.r(_.device(28, 40))

export const COVER_HEIGHT = COVER_WIDTH * 1.4

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  showRelation: true as typeof systemStore.setting.showRelation,
  size: 14 as number,
  subjectId: 0 as $['subjectId'],
  subjectPrev: undefined as $['subjectPrev'],
  subjectAfter: undefined as $['subjectAfter'],
  subjectSeries: undefined as $['subjectSeries'],
  subjectAnime: undefined as $['subjectAnime'],
  subjectDiff: undefined as $['subjectDiff']
}
