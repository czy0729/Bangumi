/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:55:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:59:40
 */
import { _, systemStore } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Navigation } from '@types'
import { Ctx } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'SortMenu')

export const COMPONENT_MAIN = rc(COMPONENT)

type $ = Ctx['$']

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  orientation: _.orientation,
  dragging: false as $['state']['dragging'],
  discoveryMenu: [] as typeof systemStore.setting.discoveryMenu,
  discoveryTodayOnair: true as typeof systemStore.setting.discoveryTodayOnair,
  discoveryMenuNum: 4 as typeof systemStore.setting.discoveryMenuNum,
  onToggle: FROZEN_FN as $['toggleDragging'],
  onSubmit: FROZEN_FN as $['saveDiscoveryMenu']
}
