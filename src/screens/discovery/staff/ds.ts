/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:05:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:07:01
 */
import { _ } from '@stores'
import { Loaded } from '@types'

export const EXCLUDE_DATA = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const STATE = {
  ...EXCLUDE_DATA,
  _loaded: false as Loaded
}
