/*
 * @Author: czy0729
 * @Date: 2023-03-19 18:42:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-21 17:40:27
 */
import { _ } from '@stores'
import { H_HEADER } from '../ds'
import { StoreType as $ } from '../types'

export const DEFAULT_PROPS = {
  fixedHeight: (_.parallaxImageHeight - H_HEADER) as $['fixedHeight'],
  page: 0 as $['state']['page'],
  scrollToOffset: {} as $['scrollToOffset'],
  fetchCollections: (() => {}) as $['fetchCollections'],
  onChange: (() => {}) as $['onChange'],
  onSelectSubjectType: (() => {}) as $['onSelectSubjectType']
}
