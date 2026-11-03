/*
 * @Author: czy0729
 * @Date: 2026-07-08 04:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-03 06:39:21
 *
 * 线程标签: 可点击切换线程, 高亮时呼吸一次
 */
import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function ThreadLabel({ item, isHighlighted, highlightTick, onPress, onLayout }: Props) {
  r(COMPONENT)

  const styles = memoStyles()

  const scale = useSharedValue(1)
  const bgOpacity = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))
  const overlayStyle = useAnimatedStyle(() => ({
    opacity: bgOpacity.value
  }))

  // 动画由 highlightTick 递增触发, isHighlighted 只作为播放条件, 不进依赖
  useEffect(() => {
    if (!isHighlighted) return

    scale.value = withSequence(
      withTiming(1.12, { duration: 700, easing: Easing.inOut(Easing.ease) }),
      withTiming(1, { duration: 700, easing: Easing.inOut(Easing.ease) })
    )
    bgOpacity.value = withSequence(
      withTiming(0.3, { duration: 700, easing: Easing.inOut(Easing.ease) }),
      withTiming(0, { duration: 700, easing: Easing.inOut(Easing.ease) })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightTick])

  const content = (
    <Animated.View style={animatedStyle}>
      <Flex justify='center'>
        <View style={styles.section}>
          <Animated.View style={[styles.highlightOverlay, overlayStyle]} />
          <Text type='sub' size={12} bold shadow align='center'>
            {item.content}
          </Text>
        </View>
      </Flex>
    </Animated.View>
  )

  if (!onPress) return onLayout ? <View onLayout={onLayout}>{content}</View> : content

  return (
    <Touchable onPress={onPress} onLayout={onLayout}>
      {content}
    </Touchable>
  )
}

export default observer(ThreadLabel)
