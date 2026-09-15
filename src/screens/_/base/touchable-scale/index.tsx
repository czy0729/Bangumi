/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:26:43
 */
import Animated from 'react-native-reanimated'
import { Touchable } from '@components'
import { r } from '@utils/dev'
import { usePressScale } from './hooks'
import { COMPONENT } from './ds'

import type { Props } from './types'

/**
 * 按住缩放反馈
 *  - 走 withoutFeedback, 无任何透明度变化, 只在"有意图的按压"时缩放
 *  - 滑动列表不会误触发; 轻点会先播"下压 → 回弹"再跳转
 *  - 结构: 交互时序状态机见 utils, 动画接线见 hooks, 本文件只做渲染组合
 * */
export function TouchableScale({
  style,
  scale,
  children,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  ...other
}: Props) {
  r(COMPONENT)

  const { animatedStyle, handlePressIn, handlePressOut, handlePress } = usePressScale({
    scale,
    onPress,
    onPressIn,
    onPressOut
  })

  return (
    <Touchable
      style={style}
      withoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      onLongPress={onLongPress}
      {...other}
    >
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Touchable>
  )
}

export default TouchableScale
