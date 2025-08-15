/*
 * @Author: czy0729
 * @Date: 2019-05-09 16:49:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-16 11:51:10
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, LayoutChangeEvent, View } from 'react-native'
import { useObserver } from 'mobx-react'
import { LinearGradient } from 'expo-linear-gradient'
import { _ } from '@stores'
import { feedback, runAfter, stl } from '@utils'
import { r } from '@utils/dev'
import { Component } from '../component'
import { Flex } from '../flex'
import { Iconfont } from '../iconfont'
import { Touchable } from '../touchable'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as ExpandProps } from './types'

export { ExpandProps }

/** 收缩与展开框 */
export const Expand = ({
  style,
  moreStyle,
  iconColor,
  ratio = 1,
  linearGradient = true,
  checkLayout = true,
  onExpand,
  onPress,
  children
}: ExpandProps) => {
  r(COMPONENT)

  // 窗口高度 (网页端适当放大比例, 减少重排)
  const ratioHeight = _.r(Math.floor(_.window.contentWidth * 0.618)) * ratio
  const aHeight = useRef(new Animated.Value(0))
  const [expand, setExpand] = useState(false)
  const [height, setHeight] = useState(0)
  const animatedStyles = useMemo(
    () => [
      styles.container,
      {
        height: height
          ? aHeight.current.interpolate({
              inputRange: [0, 1],

              // 1 个比例的最大高度
              outputRange: [
                Math.max(1, Math.min(ratioHeight, checkLayout ? height : ratioHeight)),
                Math.max(1, height)
              ]
            })
          : 'auto'
      },
      style
    ],
    [checkLayout, height, ratioHeight, style]
  )

  const handleExpand = useCallback(() => {
    if (typeof onExpand === 'function') {
      onExpand()

      // 延后展开, 通知上层组件撤销懒加载
      setTimeout(() => {
        setExpand(true)
      }, 400)
    } else {
      setExpand(true)
    }
  }, [onExpand])
  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout
      runAfter(() => {
        setHeight(height)
        if (checkLayout && height && height <= ratioHeight) handleExpand()
      }, true)
    },
    [checkLayout, ratioHeight, handleExpand]
  )
  const handlePress = useCallback(() => {
    feedback(true)

    if (typeof onPress === 'function') {
      onPress()
    } else {
      handleExpand()
    }
  }, [handleExpand, onPress])

  useEffect(() => {
    if (!expand) return

    Animated.timing(aHeight.current, {
      toValue: expand ? 1 : 0,
      duration: 160,
      useNativeDriver: false
    }).start()
  }, [expand])

  return useObserver(() => (
    <Component id='component-expand'>
      {/* @ts-ignore */}
      <Animated.View style={animatedStyles}>
        <View style={styles.layout} onLayout={handleLayout}>
          {children}
        </View>
        {!expand && (
          <>
            {linearGradient && (
              <LinearGradient
                style={styles.linear}
                colors={[
                  `rgba(${_.colorPlainRaw.join()}, 0)`,
                  `rgba(${_.colorPlainRaw.join()}, 0.32)`,
                  `rgba(${_.colorPlainRaw.join()}, 0.8)`,
                  `rgba(${_.colorPlainRaw.join()}, 1)`
                ]}
              />
            )}
            <View style={stl(styles.more, moreStyle)}>
              <Touchable onPress={handlePress}>
                <Flex justify='center'>
                  <Iconfont
                    name='md-keyboard-arrow-down'
                    color={iconColor}
                    size={_.device(24, 32)}
                  />
                </Flex>
              </Touchable>
            </View>
          </>
        )}
      </Animated.View>
    </Component>
  ))
}

export default Expand
