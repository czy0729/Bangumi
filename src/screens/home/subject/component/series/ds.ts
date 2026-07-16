/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:03:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 20:54:09
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { systemStore } from '@stores'
import type { Ctx } from '../../types'

type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Series')

export const COMPONENT_MAIN = rc(COMPONENT)

export const COVER_WIDTH = _.device(26, 40)

export const COVER_HEIGHT = Math.floor(COVER_WIDTH * 1.4)

export const DEFAULT_PROPS = {
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
