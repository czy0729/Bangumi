/*
 * @Author: czy0729
 * @Date: 2025-10-23 17:41:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-24 08:44:37
 */
import type { Animated } from 'react-native'
import type { ScrollEvent } from '@types'
import type { HandleRefreshOffset } from '../../types'

export type Props = {
  page: number
  scrollY: Animated.Value
  onScroll: (evt?: ScrollEvent) => void
  onSwipeStart: () => void
  onIndexChange: (index: number) => void
  onRefreshOffset: HandleRefreshOffset
}
