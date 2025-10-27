/*
 * @Author: czy0729
 * @Date: 2023-12-17 04:59:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 05:00:49
 */
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenTinygrailTrade'

export const m1 = 60 * 1000
export const m5 = m1 * 5
export const m15 = m1 * 15
export const h1 = m1 * 60
export const h4 = h1 * 4
export const h12 = h1 * 12
export const d1 = h1 * 24
export const w1 = d1 * 7
export const month1 = d1 * 30

export const STATE = {
  /** K 线是否加载中 */
  loading: true,
  distance: d1,
  _loaded: false as Loaded
}
