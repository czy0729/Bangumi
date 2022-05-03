/*
 * @Author: czy0729
 * @Date: 2022-04-17 16:58:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-02 18:02:31
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
import { Flex } from '../flex'
import { Text } from '../text'
import { memoStyles } from './styles'

type Props = {
  /** 容器长度 */
  width?: number

  /** 是否显示 */
  show?: boolean

  /** 提示文字 */
  message?: string

  /** 当前计数 */
  current: number

  /** 总计数 */
  total: number
}

export const Progress = ({
  width = 200,
  show = false,
  message = '请求中',
  current = 0,
  total = 1
}: Props) => {
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
