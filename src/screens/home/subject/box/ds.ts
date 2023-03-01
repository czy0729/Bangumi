/*
 * @Author: czy0729
 * @Date: 2022-07-10 03:33:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-01 08:30:29
 */
import { systemStore } from '@stores'
import { Navigation } from '@types'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const RATE = [1, 2, 3, 4, 5] as const

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  isLogin: false as $['isLogin'],
  status: [] as $['status'],
  showCount: true as typeof systemStore.setting.showCount,
  showManageModel: (() => {}) as $['showManageModel'],
  toRating: (() => {}) as $['toRating'],
  outdate: false as boolean
}
