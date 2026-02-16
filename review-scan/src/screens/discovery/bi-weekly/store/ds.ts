/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:33:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 04:13:17
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { COMPONENT, TYPE_DS } from '../ds'
import { Type } from '../types'

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

  /** 文章类型 */
  type: TYPE_DS[0] as Type,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
