/*
 * @Author: czy0729
 * @Date: 2023-03-19 18:42:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 11:47:21
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT, H_HEADER } from '../ds'
import { StoreType as $ } from '../types'

export const COMPONENT = rc(PARENT, 'Scroll')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  fixedHeight: (_.parallaxImageHeight - H_HEADER) as $['fixedHeight'],
  page: 0 as $['state']['page'],
  scrollToOffset: {} as $['scrollToOffset'],
  fetchCollections: (() => {}) as $['fetchCollections'],
  onChange: (() => {}) as $['onChange'],
  onScroll: (() => {}) as $['onScroll']
}
