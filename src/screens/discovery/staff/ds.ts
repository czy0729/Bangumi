/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:05:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-05 13:02:51
 */
import { _ } from '@stores'
import { Loaded } from '@types'

export const COMPONENT = 'Staff'

export const EXCLUDE_DATA = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const STATE = {
  ...EXCLUDE_DATA,
  _loaded: false as Loaded
}
