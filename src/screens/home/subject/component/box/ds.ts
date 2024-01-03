/*
 * @Author: czy0729
 * @Date: 2022-07-10 03:33:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 00:14:44
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { Navigation } from '@types'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Box')

export const COMPONENT_MAIN = rc(COMPONENT)

export const RATE = [1, 2, 3, 4, 5] as const

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  isLogin: false as $['isLogin'],
  status: [] as $['status'],
  url: '' as $['url'],
  showCount: true as typeof systemStore.setting.showCount,
  showManageModel: (() => {}) as $['showManageModel'],
  toRating: (() => {}) as $['toRating'],
  outdate: false as boolean
}
