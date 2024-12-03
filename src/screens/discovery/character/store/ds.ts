/*
 * @Author: czy0729
 * @Date: 2023-12-17 08:20:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-03 16:34:34
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const STATE = {
  page: 0,

  ...EXCLUDE_STATE,
  _loaded: true as Loaded
}
