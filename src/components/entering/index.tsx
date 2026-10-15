/*
 * @Author: czy0729
 * @Date: 2026-10-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 00:00:00
 *
 * 前 N 项进场动画
 */
import Animated, { FadeInDown } from 'react-native-reanimated'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { Props as EnteringProps } from './types'
export type { EnteringProps }

/** 前 N 项包 FadeInDown, 第 N 项起不产生额外 View */
export const Entering = ({ index, num, children }: EnteringProps) => {
  r(COMPONENT)

  if (index >= num) return <>{children}</>

  return <Animated.View entering={FadeInDown.duration(640)}>{children}</Animated.View>
}

export default Entering
