/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:55:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-10 08:00:15
 */
import { _ } from '@stores'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  orientation: _.orientation,
  dragging: false as $['state']['dragging'],
  discoveryMenu: [] as $['discoveryMenu'],
  discoveryTodayOnair: true as $['discoveryTodayOnair'],
  discoveryMenuNum: 4 as $['discoveryMenuNum'],
  onToggle: (() => {}) as $['toggleDragging'],
  onSubmit: (() => {}) as $['saveDiscoveryMenu']
}
