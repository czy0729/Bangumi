/*
 * @Author: czy0729
 * @Date: 2023-04-27 15:38:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 08:22:49
 */
import { _ } from '@stores'
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenDollars'

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** 发送中 */
  fetching: false,

  /** 显示输入框 */
  show: false,

  /** 输入框 */
  text: ''
}

export const STATE = {
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
