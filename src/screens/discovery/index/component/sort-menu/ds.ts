/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:55:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:04:25
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT as PARENT } from '../ds'

import type { systemStore } from '@stores'
import type { Ctx } from '../../types'
import type { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'SortMenu')

export const COMPONENT_MAIN = rc(COMPONENT)

type $ = Ctx['$']

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  orientation: _.orientation,
  dragging: false as $['state']['dragging'],
  discoveryMenu: [] as typeof systemStore.setting.discoveryMenu,
  discoveryMenuNum: 4 as typeof systemStore.setting.discoveryMenuNum,
  onToggle: FROZEN_FN as $['toggleDragging'],
  onSubmit: FROZEN_FN as $['saveDiscoveryMenu']
}
