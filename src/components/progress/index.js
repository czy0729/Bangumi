/*
 * @Author: czy0729
 * @Date: 2022-04-17 16:58:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-20 19:11:23
 */
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react-lite'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated'
import { _ } from '@stores'
import { Flex } from '../flex'
import { Text } from '../text'

export const Progress = ({
  width = 180,
  show = false,
  message = '请求中',
  current = 0,
  total = 1
}) => {
  const w = useSharedValue(current / (total || 1))
  const barStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(parseInt(w.value * width), {
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
    )
  })
}

const memoStyles = _.memoStyles(() => ({
  progress: {
    position: 'absolute',
    zIndex: 1000,
    right: _.wind,
    bottom: _.lg,
    paddingTop: _.sm,
    paddingHorizontal: _.sm + 4,
    paddingBottom: _.sm + 6,
    backgroundColor: _.select('#ffffff', _._colorDarkModeLevel2),
    elevation: _.select(16, 0),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  bar: {
    position: 'absolute',
    zIndex: 1001,
    right: 0,
    bottom: 0,
    left: 0
  },
  barActive: {
    height: 6,
    backgroundColor: 'rgb(0, 173, 146)',
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
