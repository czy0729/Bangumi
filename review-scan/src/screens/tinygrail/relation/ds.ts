/*
 * @Author: czy0729
 * @Date: 2024-11-19 15:45:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 15:47:58
 */
import { Loaded } from '@types'

export const EXCLUDE_STATE = {
  level: '',
  sort: '',
  direction: '' as '' | 'up' | 'down',
  go: '买入',
  _loaded: false as Loaded
}

export const STATE = {
  ...EXCLUDE_STATE
}

export const HM = ['tinygrail/relation', 'TinygrailRelation'] as const
