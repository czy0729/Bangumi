/*
 * @Author: czy0729
 * @Date: 2022-08-19 17:05:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-08 16:45:51
 */
import { _ } from '@stores'
import { Loaded } from '@types'

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** Tab 当前页 */
  page: 0,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
