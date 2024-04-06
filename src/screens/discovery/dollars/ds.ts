/*
 * @Author: czy0729
 * @Date: 2023-04-27 15:38:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 03:14:46
 */
import { _ } from '@stores'
import { Loaded } from '@types'

export const COMPONENT = 'Dollars'

export const NAMESPACE = `Screen${COMPONENT}` as const

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
