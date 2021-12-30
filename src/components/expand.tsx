/*
 * 收缩展开框
 * @Author: czy0729
 * @Date: 2019-05-09 16:49:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-30 07:38:12
 */
import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { StyleProp, ViewStyle, View, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useObserver } from 'mobx-react-lite'
import { _ } from '@stores'
import { Touchable } from './touchable'
import { Flex } from './flex'
import { Iconfont } from './iconfont'

type Props = {
  style?: StyleProp<ViewStyle>
  moreStyle?: StyleProp<ViewStyle>
  children: React.ReactNode

  /** 比例 */
  ratio?: number
}

export const Expand: React.FC<Props> = ({ style, moreStyle, ratio = 1, children }) => {
  const aHeight = useRef(new Animated.Value(0))
  const ratioHeight = 216 * _.ratio * ratio

  const [expand, setExpand] = useState(false)
  const [height, setHeight] = useState(0)
  const animatedStyles = useMemo(
    () => [
      styles.container,
      {
        height: height
          ? aHeight.current.interpolate({
              inputRange: [0, 1],

              // 1个比例的最大高度
              outputRange: [Math.min(ratioHeight, height), height]
            })
          : 'auto'
      },
      style
    ],
    [height, ratioHeight, style]
  )

  const onExpand = useCallback(() => setExpand(true), [])
  const onLayout = useCallback(
    event => {
      const { height } = event.nativeEvent.layout
      setHeight(height)
      if (height <= ratioHeight) onExpand()
    },
    [ratioHeight, onExpand]
  )

  useEffect(() => {
    if (!expand) return

    Animated.timing(aHeight.current, {
      toValue: expand ? 1 : 0,
      duration: 160,
      useNativeDriver: false
    }).start()
  }, [expand])

  return useObserver(() => (
    <Animated.View style={animatedStyles}>
      <View style={styles.layout} onLayout={onLayout}>
        {children}
      </View>
      {!expand && (
        <>
          <LinearGradient
            style={styles.linear}
            colors={[
              `rgba(${_.colorPlainRaw.join()}, 0)`,
              `rgba(${_.colorPlainRaw.join()}, 0.32)`,
              `rgba(${_.colorPlainRaw.join()}, 0.8)`,
              `rgba(${_.colorPlainRaw.join()}, 1)`
            ]}
          />
          <View style={[styles.more, moreStyle]}>
            <Touchable onPress={onExpand}>
              <Flex justify='center'>
                <Iconfont name='md-keyboard-arrow-down' size={_.device(24, 32)} />
              </Flex>
            </Touchable>
          </View>
        </>
      )}
    </Animated.View>
  ))
}

const styles = _.create({
  container: {
    overflow: 'hidden'
  },
  layout: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  linear: {
    position: 'absolute',
    right: 0,
    bottom: -2,
    left: 0,
    height: 64
  },
  more: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: -_.md,
    left: 0,
    padding: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
