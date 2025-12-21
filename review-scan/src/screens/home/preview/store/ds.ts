/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:19:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-07 01:10:37
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE
}

export const STATE = {
  ...EXCLUDE_STATE,
  epsThumbs: [],
  epsThumbsHeader: {},
  _loaded: false as Loaded
}
