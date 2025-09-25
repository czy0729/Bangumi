/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:03:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-24 02:08:35
 */
import { _, systemStore } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Series')

export const COMPONENT_MAIN = rc(COMPONENT)

export const COVER_WIDTH = _.r(_.device(28, 40))

export const COVER_HEIGHT = COVER_WIDTH * 1.4

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  showRelation: true as typeof systemStore.setting.showRelation,
  size: 14 as number,
  subjectId: 0 as $['subjectId'],
  subjectAfter: undefined as $['subjectAfter'],
  subjectAnime: undefined as $['subjectAnime'],
  subjectBook: undefined as $['subjectBook'],
  subjectDiff: undefined as $['subjectDiff'],
  subjectPrev: undefined as $['subjectPrev'],
  subjectSeries: undefined as $['subjectSeries']
}
