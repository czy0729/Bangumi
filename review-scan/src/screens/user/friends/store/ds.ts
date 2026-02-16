/*
 * @Author: czy0729
 * @Date: 2022-08-07 03:57:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 04:52:26
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'
import { Sort } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,
  sort: '' as Sort,
  filter: '',
  fetching: false
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
