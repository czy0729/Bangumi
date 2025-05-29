/*
 * @Author: czy0729
 * @Date: 2023-12-17 06:48:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 00:10:35
 */
import { _ } from '@stores'
import { Loaded } from '@types'

export const COMPONENT = 'RakuenSearch'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,
  value: '',
  searching: false,
  cache: {}
}

export const STATE = {
  ...EXCLUDE_STATE,
  history: [],

  /** 页面初始化完成 */
  _loaded: false as Loaded
}

export const HM = ['rakuenSearch', 'RakuenSearch'] as const
