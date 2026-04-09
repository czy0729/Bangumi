/*
 * @Author: czy0729
 * @Date: 2024-12-16 20:21:34
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-12-16 20:21:34
 */
import { COMPONENT } from '../ds'

import type { Loaded } from '@types'
import type { Direction } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  page: 0,
  level: '' as string | number,
  sort: '',
  direction: '' as Direction,
  go: '卖出',
  _loaded: false as Loaded
}
