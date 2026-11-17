/*
 * @Author: czy0729
 * @Date: 2025-03-06 17:43:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-13 12:20:35
 */
import type { Navigation } from '@types'
import type { BOTTOM_TABS } from '../config'
import type { State } from '../types'

export type Props = {
  navigation: Navigation
  route: State['routes'][number]
  length: number
  config: (typeof BOTTOM_TABS)[number]
  isFocused: boolean
}
