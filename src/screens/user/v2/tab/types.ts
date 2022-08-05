/*
 * @Author: czy0729
 * @Date: 2022-08-05 07:04:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-05 07:18:12
 */
import { Animated } from 'react-native'
import { Fn } from '@types'

export type Props = {
  page: number
  scrollY: Animated.AnimatedValue
  scrollEventThrottle: number
  onIndexChange: Fn
  onScroll: Fn
  onSelectSubjectType: Fn
  onSwipeStart: Fn
  onToggleList: Fn
}
