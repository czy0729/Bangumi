/*
 * 收缩展开框
 * @Author: czy0729
 * @Date: 2019-05-09 16:49:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-31 11:20:47
 */
import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { View, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useObserver } from 'mobx-react-lite'
import { _ } from '@stores'
import { Touchable } from '../touchable'
import { Flex } from '../flex'
import { Iconfont } from '../iconfont'
import { styles } from './styles'
import { Props } from './types'

export const Expand = ({
  style,
  moreStyle,
  ratio = 1,
  onExpand: onExpandCb,
  children
}: Props) => {
  const aHeight = useRef(new Animated.Value(0))
  const ratioHeight = _.r(216) * ratio

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

  const onExpand = useCallback(() => {
    if (typeof onExpandCb === 'function') {
      onExpandCb()

      // 延后展开, 通知上层组件撤销懒加载
      setTimeout(() => {
        setExpand(true)
      }, 400)
    } else {
      setExpand(true)
    }
  }, [onExpandCb])
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
