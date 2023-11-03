/*
 * @Author: czy0729
 * @Date: 2022-07-16 11:34:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-20 23:18:48
 */
import { systemStore } from '@stores'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  showRelation: false as typeof systemStore.setting.showRelation,
  subject: {} as $['subject'],
  subjectPrev: undefined as $['subjectPrev'],
  subjectAfter: undefined as $['subjectAfter'],
  subjectSeries: undefined as $['subjectSeries'],
  cn: '' as $['cn'],
  jp: '' as $['jp'],
  release: '' as $['release'],
  year: '' as $['year'],
  coverPlaceholder: '' as $['coverPlaceholder'],
  imageWidth: 0 as $['imageWidth'],
  imageHeight: 0 as $['imageHeight'],
  titleLabel: '' as $['titleLabel'],
  hideScore: false as $['hideScore'],
  rating: {} as $['rating'],
  x18: false as $['x18'],
  hasSeries: false as $['hasSeries']
}
