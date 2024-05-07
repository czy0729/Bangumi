/*
 * @Author: czy0729
 * @Date: 2023-12-17 06:46:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 00:59:43
 */
import { Loaded } from '@types'

export const COMPONENT = 'Board'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  history: [],

  /** 云快照 */
  ota: {},
  _loaded: false as Loaded
}
