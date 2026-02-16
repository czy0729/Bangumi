/*
 * @Author: czy0729
 * @Date: 2024-11-20 11:24:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 15:59:17
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

export const HM = ['tinygrail/valhall', 'TinygrailValhall'] as const
