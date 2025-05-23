/*
 * @Author: czy0729
 * @Date: 2022-09-03 12:36:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 10:05:39
 */
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  ipt: '',
  filter: '',
  isFocused: true,

  /** 云快照 */
  ota: {}
}

export const STATE = {
  ...EXCLUDE_STATE,

  page: 0,
  rec: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
