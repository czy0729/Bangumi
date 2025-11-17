/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:19:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-07 01:10:37
 */
import { _ } from '@stores'
import { COMPONENT } from '../ds'

import type { Loaded } from '@types'

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

  /** 缩略图 */
  epsThumbs: [] as string[],

  /** 缩略图请求头 */
  epsThumbsHeader: {} as {
    Referer?: string
  },

  _loaded: false as Loaded
}
