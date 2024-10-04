/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:17:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-04 20:37:36
 */
import { _ } from '@stores'
import { Loaded } from '@types'

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** 筛选职位 */
  position: ''
}

export const STATE = {
  /** 云快照 */
  ota: {},
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
