/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:15:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-24 11:19:45
 */
import { _ } from '@stores'
import { Loaded } from '@types'

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const STATE = {
  /** 云快照 */
  ota: {},
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
