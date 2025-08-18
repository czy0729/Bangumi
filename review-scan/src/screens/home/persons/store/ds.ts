/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:17:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-04 20:37:36
 */
import { _ } from '@stores'
import { Loaded } from '@types'

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 筛选职位 */
  position: ''
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 云快照 */
  ota: {},

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
