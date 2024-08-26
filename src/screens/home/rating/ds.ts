/*
 * @Author: czy0729
 * @Date: 2022-09-01 10:20:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-26 08:21:37
 */
import { RATING_STATUS } from '@constants'

export const COMPONENT = 'Rating'

export const STATUS_MAP = {
  wish: 0,
  collect: 1,
  doing: 2,
  doings: 2,
  onHold: 3,
  on_hold: 3,
  dropped: 4
} as const

export const TABS = RATING_STATUS.map(item => ({
  key: item.value,
  title: item.label
}))
