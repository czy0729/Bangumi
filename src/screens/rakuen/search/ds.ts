/*
 * @Author: czy0729
 * @Date: 2023-12-17 06:48:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 00:10:35
 */
import { Loaded } from '@types'

export const COMPONENT = 'RakuenSearch'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  value: '',
  searching: false,
  cache: {}
}

export const STATE = {
  history: [],
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
