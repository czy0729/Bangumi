/*
 * @Author: czy0729
 * @Date: 2023-12-17 04:57:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 04:57:42
 */
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenTinygrailSearch'

export const EXCLUDE_STATE = {
  value: '',
  list: [],
  searching: false
}

export const STATE = {
  history: [],
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
