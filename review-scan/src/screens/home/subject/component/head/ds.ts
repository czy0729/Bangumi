/*
 * @Author: czy0729
 * @Date: 2022-07-16 11:34:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-30 09:40:14
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Head')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  showRelation: false as typeof systemStore.setting.showRelation,
  subjectId: 0 as $['subjectId'],
  subjectPrev: undefined as $['subjectPrev'],
  subjectAfter: undefined as $['subjectAfter'],
  subjectSeries: undefined as $['subjectSeries'],
  cn: '' as $['cn'],
  jp: '' as $['jp'],
  release: '' as $['release'],
  year: '' as $['year'],
  imageWidth: 0 as $['imageWidth'],
  imageHeight: 0 as $['imageHeight'],
  titleLabel: '' as $['titleLabel'],
  hideScore: false as typeof systemStore.setting.hideScore,
  rating: {} as $['rating'],
  nsfw: false as $['nsfw'],
  hasSeries: false as $['hasSeries'],
  isMusic: false as boolean
}
