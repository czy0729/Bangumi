/*
 * @Author: czy0729
 * @Date: 2022-07-10 03:33:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:27:19
 */
import { systemStore, userStore } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Navigation } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Box')

export const COMPONENT_MAIN = rc(COMPONENT)

export const RATE = [1, 2, 3, 4, 5] as const

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  isLogin: false as typeof userStore.isLogin,
  status: [] as $['status'],
  url: '' as $['url'],
  showCount: true as typeof systemStore.setting.showCount,
  showManageModel: FROZEN_FN as $['showManageModel'],
  toRating: FROZEN_FN as $['toRating'],
  outdate: false as boolean
}
