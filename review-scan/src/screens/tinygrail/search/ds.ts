/*
 * @Author: czy0729
 * @Date: 2023-12-17 04:57:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 07:37:11
 */
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenTinygrailSearch'

export const COMPONENT = 'ScreenTinygrailSearch'

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

export const HM = ['tinygrail/search', 'TinygrailSearch'] as const
