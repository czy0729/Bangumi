/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:40:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-08 10:53:06
 */
import { Loaded } from '@types'

export const COMPONENT = 'Group'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  page: 1,
  show: true,
  ipt: '1',
  history: [],

  /** 云快照 */
  ota: {},

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
