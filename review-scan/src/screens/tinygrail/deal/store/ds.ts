/*
 * @Author: czy0729
 * @Date: 2024-12-27 09:09:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-27 09:10:35
 */
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const DEFAULT_TYPE = 'bid'

export const EXCLUDE_STATE = {
  /** 买卖类型 */
  type: DEFAULT_TYPE,

  /** 只能到一位小数 */
  value: 0 as string | number,

  /** 只能是整数 */
  amount: 0,

  /** 展开买卖记录 */
  expand: false,

  /** 是否请求中 */
  loading: false
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 是否冰山委托 */
  isIce: false,
  _loaded: false
}
