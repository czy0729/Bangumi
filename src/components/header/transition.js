/*
 * @Author: czy0729
 * @Date: 2022-03-12 20:43:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-14 23:20:04
 */
import React, { useEffect } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { Text } from '../text'

export const headerTransitionHeight = 56

function Transition({ y, fixed, title, headerTitle }) {
  const wrapOpacity = useSharedValue(0)
  const wrapStyles = useAnimatedStyle(() => ({
    opacity: wrapOpacity.value
  }))
  const bodyStyles = useAnimatedStyle(() => ({
    opacity: withTiming(fixed ? 1 : 0, {
      duration: 160
    }),
    marginBottom: withTiming(fixed ? 0 : -24, {
      duration: 160
    })
  }))

  useEffect(() => {
    wrapOpacity.value = fixed ? 1 : y / headerTransitionHeight
  }, [y, fixed, wrapOpacity])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Animated.View style={[styles.view, wrapStyles]}>
        <Animated.View style={[styles.body, bodyStyles]}>
          {headerTitle || (
            <Text style={styles.text} size={15}>
              {title}
            </Text>
          )}
        </Animated.View>
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
    backgroundColor: _.colorPlain,
    overflow: 'hidden'
  },
  body: {
    position: 'absolute',
    zIndex: 1,
    bottom: 8,
    left: 56,
    right: 88
  },
  text: {
    marginBottom: 10,
    marginLeft: -8
  }
}))
