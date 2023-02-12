/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:55:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-13 05:21:21
 */
import { _ } from '@stores'
import { Navigation } from '@types'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  orientation: _.orientation,
  dragging: false as $['state']['dragging'],
  discoveryMenu: [] as $['discoveryMenu'],
  discoveryTodayOnair: true as $['discoveryTodayOnair'],
  discoveryMenuNum: 4 as $['discoveryMenuNum'],
  onToggle: (() => {}) as $['toggleDragging'],
  onSubmit: (() => {}) as $['saveDiscoveryMenu']
}
