/*
 * @Author: czy0729
 * @Date: 2023-04-27 15:38:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-03 13:40:56
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 发送中 */
  fetching: false,

  /** 显示输入框 */
  show: false,

  /** 输入框 */
  text: ''
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
