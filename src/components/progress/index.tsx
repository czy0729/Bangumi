/*
 * @Author: czy0729
 * @Date: 2022-04-17 16:58:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-04 22:05:44
 */
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated'
import { Component } from '../component'
import { Flex } from '../flex'
import { Text } from '../text'
import { memoStyles } from './styles'
import { Props as ProgressProps } from './types'

export { ProgressProps }

/** 进度条 */
export const Progress = ({
  width = 200,
  show = false,
  message = '请求中',
  current = 0,
  total = 1
}: ProgressProps) => {
  const w = useSharedValue(current / (total || 1))
  const barStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(Number(w.value * width), {
        duration: 80,
        easing: Easing.linear
      })
    }
  })
  useEffect(() => {
    w.value = current / (total || 1)
  }, [w, current, total])

  return useObserver(() => {
    if (!show || !total) return null

    const styles = memoStyles()
    return (
      <Component id='component-progress'>
        <Flex
          style={[
            styles.progress,
            {
              width
            }
          ]}
        >
          <Text size={13}>
            <Text size={13}>{message}</Text>
            <Text type='sub' size={11} lineHeight={13}>
              {' '}
              {current} / {total}
            </Text>
          </Text>
          <View style={styles.bar}>
            <Animated.View style={[styles.barActive, barStyle]} />
          </View>
        </Flex>
      </Component>
    )
  })
}
