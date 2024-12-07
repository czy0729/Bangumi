/*
 * @Author: czy0729
 * @Date: 2024-12-05 15:17:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-05 15:17:21
 */
import { _ } from '@stores'
import { Loaded } from '@types'

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const STATE = {
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
