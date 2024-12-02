/*
 * @Author: czy0729
 * @Date: 2024-12-02 10:05:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 10:36:02
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
