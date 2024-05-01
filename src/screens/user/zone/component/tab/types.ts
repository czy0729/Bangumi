/*
 * @Author: czy0729
 * @Date: 2024-05-01 08:15:57
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-05-01 08:15:57
 */
import { Fn } from '@types'

export type Props = {
  scrollEventThrottle: number
  onIndexChange: Fn
  onScroll: Fn
  onSwipeStart: Fn
}
