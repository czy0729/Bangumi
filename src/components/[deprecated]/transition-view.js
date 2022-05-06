/*
 * @Author: czy0729
 * @Date: 2021-11-20 13:53:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-21 02:21:58
 */
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated'

const TransitionViewMain = ({ style, children, ...other }) => {
  const backgroundColor = useSharedValue(style.backgroundColor)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColor.value, {
        duration: 160,
        easing: Easing.linear
      })
    }
  })
  useEffect(() => {
    backgroundColor.value = style.backgroundColor
  }, [backgroundColor, style.backgroundColor])

  return (
    <Animated.View style={[style, animatedStyle]} {...other}>
      {children}
    </Animated.View>
  )
}

export const TransitionView = ({ style, children, ...other }) => {
  const styles = StyleSheet.flatten(style) || {}
  if (!styles.backgroundColor) {
    return (
      <View style={style} {...other}>
        {children}
      </View>
    )
  }

  return (
    <TransitionViewMain style={styles} {...other}>
      {children}
    </TransitionViewMain>
  )
}
