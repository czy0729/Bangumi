/*
 * @Author: czy0729
 * @Date: 2022-03-12 20:43:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-12 22:32:13
 */
import React, { useEffect } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { Text } from '../text'

function Transition({ fixed, title }) {
  const opacity = useSharedValue(0)
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))
  useEffect(() => {
    opacity.value = withTiming(fixed ? 1 : 0, {
      duration: 240,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1)
    })
  }, [fixed, opacity])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Animated.View style={[styles.view, animatedStyles]}>
        <Text style={styles.title} size={15}>
          {title}
        </Text>
      </Animated.View>
    )
  })
}

export default Transition

const memoStyles = _.memoStyles(() => ({
  view: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: _.colorPlain
  },
  title: {
    position: 'absolute',
    zIndex: 1,
    bottom: 18,
    left: 48,
    right: 88
  }
}))
