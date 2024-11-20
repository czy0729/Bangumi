/*
 * @Author: czy0729
 * @Date: 2021-03-05 14:29:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 15:31:52
 */
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenTinygrailNew'

export const EXCLUDE_STATE = {
  page: 0,
  level: '',
  sort: '',
  direction: '' as '' | 'up' | 'down',
  go: '卖出',
  _loaded: false as Loaded
}

export const STATE = {
  ...EXCLUDE_STATE
}

export const TABS = [
  {
    title: '最近活跃',
    key: 'nbc'
  },
  {
    title: '最高市值',
    key: 'tnbc'
  }
] as const
