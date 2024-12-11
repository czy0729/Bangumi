/*
 * @Author: czy0729
 * @Date: 2022-09-07 14:38:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 22:39:55
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Scree${COMPONENT}`

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const STATE = {
  list: true,

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
