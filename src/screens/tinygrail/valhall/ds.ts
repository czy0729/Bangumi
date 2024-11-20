/*
 * @Author: czy0729
 * @Date: 2024-11-20 11:24:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 11:31:05
 */
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenTinygrailValhall'

export const EXCLUDE_STATE = {
  level: '',
  sort: '',
  direction: '' as '' | 'up' | 'down',
  go: '资产重组'
}

export const STATE = {
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
