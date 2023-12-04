/*
 * @Author: czy0729
 * @Date: 2021-09-26 13:37:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-04 19:50:59
 */
import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { View, Animated } from 'react-native'
import { runAfter } from '@utils'
import { styles } from './styles'
import { Props as AccordionProps } from './types'

export { AccordionProps }

const MIN_HEIGHT = 48

/** 手风琴 */
export const Accordion = ({
  style,
  expand = false,
  lazy = true,
  children
}: AccordionProps) => {
  const [show, setShow] = useState(lazy ? expand : true)
  const expanded = useRef(expand)
  const [h, setH] = useState(0)
  const aH = useRef(new Animated.Value(expand ? 1 : 0))
  const animatedStyles = useMemo(
    () => [
      styles.container,
      {
        height: h
          ? aH.current.interpolate({
              inputRange: [0, 1],
              outputRange: [0, Math.max(h, MIN_HEIGHT)]
            })
          : 'auto'
      },
      style
    ],
    [h, style]
  )
  const onLayout = useCallback(
    event => {
      const { height } = event.nativeEvent.layout
      if (height > h) setH(height)
    },
    [h]
  )

  useEffect(() => {
    runAfter(() => {
      if (expand) {
        setShow(true)
        expanded.current = true
      }

      Animated.timing(aH.current, {
        toValue: expand ? 1 : 0,
        duration: 160,
        useNativeDriver: false
      }).start()

      if (!expand) {
        setTimeout(() => {
          setShow(false)
        }, 180)
      }
    })
  }, [expand])

  if (!expanded.current && lazy && !show) return null

  return (
    // @ts-ignore
    <Animated.View style={animatedStyles}>
      <View onLayout={onLayout}>{children}</View>
    </Animated.View>
  )
}
