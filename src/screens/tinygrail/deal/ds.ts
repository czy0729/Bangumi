/*
 * @Author: czy0729
 * @Date: 2022-11-08 19:59:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 20:45:04
 */
export const NAMESPACE = 'ScreenTinygrailDeal'

export const DEFAULT_TYPE = 'bid'

export const EXCLUDE_STATE = {
  /** 买卖类型 */
  type: DEFAULT_TYPE,

  /** 只能到一位小数 */
  value: 0,

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
