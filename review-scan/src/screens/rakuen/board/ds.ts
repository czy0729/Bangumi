/*
 * @Author: czy0729
 * @Date: 2023-12-17 06:52:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 04:33:23
 */
import { Loaded } from '@types'

export const COMPONENT = 'Board'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  history: [],

  /** 云快照 */
  ota: {},

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
