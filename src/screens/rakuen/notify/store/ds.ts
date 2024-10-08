/*
 * @Author: czy0729
 * @Date: 2022-08-19 17:05:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-08 16:45:51
 */
import { _ } from '@stores'
import { Loaded } from '@types'

export const STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** Tab 当前页 */
  page: 0,

  _loaded: false as Loaded
}
