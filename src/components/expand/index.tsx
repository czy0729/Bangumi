/*
 * @Author: czy0729
 * @Date: 2019-05-09 16:49:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-03 16:06:45
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, View } from 'react-native'
import { observer } from 'mobx-react'
import { LinearGradient } from 'expo-linear-gradient'
import { _ } from '@stores'
import { feedback, postTask, stl } from '@utils'
import { r } from '@utils/dev'
import { Component } from '../component'
import { Flex } from '../flex'
import { Iconfont } from '../iconfont'
import { Touchable } from '../touchable'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { LayoutChangeEvent } from 'react-native'
import type { Props as ExpandProps } from './types'
export type { ExpandProps }

/** 收缩与展开框 */
export const Expand = observer(
  ({
    style,
    moreStyle,
    iconColor,
    ratio = 1,
    linearGradient = true,
    linearGradientColor = _.colorPlainRaw,
    checkLayout = true,
    onExpand,
    onPress,
    children
  }: ExpandProps) => {
    r(COMPONENT)

    /** 固定首次 ratioHeight，避免窗口变化导致重新计算 */
    const initialRatioHeight = useRef(_.r(Math.floor(_.__contentWidth__ * 0.618)) * ratio).current

    const aHeight = useRef(new Animated.Value(0))
    const [expand, setExpand] = useState(false)
    const [height, setHeight] = useState(0)

    /** 防止重复自动展开 */
    const didAutoExpand = useRef(false)

    /** 只允许第一次有效 layout 参与自动判断 */
    const didMeasure = useRef(false)

    const animatedStyles = useMemo(
      () => [
        styles.container,
        {
          height: height
            ? aHeight.current.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  Math.max(
                    1,
                    Math.min(initialRatioHeight, checkLayout ? height : initialRatioHeight)
                  ),
                  Math.max(1, height)
                ]
              })
            : 'auto'
        },
        style
      ],
      [checkLayout, height, initialRatioHeight, style]
    )

    const handleExpand = useCallback(() => {
      if (expand) return

      if (typeof onExpand === 'function') {
        onExpand()

        // 延后展开, 通知上层组件撤销懒加载
        setTimeout(() => {
          setExpand(true)
        }, 400)
      } else {
        setExpand(true)
      }
    }, [expand, onExpand])

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        const layoutHeight = event.nativeEvent.layout.height

        postTask(() => {
          if (!layoutHeight) return

          setHeight(layoutHeight)

          // 只在第一次测量时判断自动展开
          if (checkLayout && !didMeasure.current && !didAutoExpand.current) {
            didMeasure.current = true

            if (layoutHeight <= initialRatioHeight) {
              didAutoExpand.current = true
              handleExpand()
            }
          }
        }, 0)
      },
      [checkLayout, handleExpand, initialRatioHeight]
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
        toValue: 1,
        duration: 160,
        useNativeDriver: false
      }).start()
    }, [expand])

    return (
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
                    `rgba(${linearGradientColor.join()}, 0)`,
                    `rgba(${linearGradientColor.join()}, 0.32)`,
                    `rgba(${linearGradientColor.join()}, 0.8)`,
                    `rgba(${linearGradientColor.join()}, 1)`
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
    )
  }
)

export default Expand
