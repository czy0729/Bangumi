/*
 * @Author: czy0729
 * @Date: 2026-07-08 04:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-08 04:00:00
 */
import React, { useEffect } from 'react'
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

  const scale = useSharedValue(1)
  const bgOpacity = useSharedValue(0)
  const styles = memoStyles()

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))
  const overlayStyle = useAnimatedStyle(() => ({
    opacity: bgOpacity.value
  }))

  useEffect(() => {
    if (isHighlighted) {
      scale.value = withSequence(
        withTiming(1.12, { duration: 700, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 700, easing: Easing.inOut(Easing.ease) })
      )
      bgOpacity.value = withSequence(
        withTiming(0.3, { duration: 700, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 700, easing: Easing.inOut(Easing.ease) })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightTick])

  const content = (
    <Flex justify='center'>
      <View style={styles.section}>
        <Animated.View style={[styles.highlightOverlay, overlayStyle]} />
        <Text type='sub' size={12} bold shadow align='center'>
          {item.content}
        </Text>
      </View>
    </Flex>
  )

  const wrapped = <Animated.View style={animatedStyle}>{content}</Animated.View>

  if (onPress) {
    return (
      <Touchable onPress={onPress} onLayout={onLayout}>
        {wrapped}
      </Touchable>
    )
  }

  return wrapped
}

export default observer(ThreadLabel)
