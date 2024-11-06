/*
 * @Author: czy0729
 * @Date: 2021-09-26 13:37:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-06 20:37:47
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, LayoutChangeEvent, View } from 'react-native'
import { runAfter } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT, MIN_HEIGHT } from './ds'
import { styles } from './styles'
import { Props as AccordionProps } from './types'

export { AccordionProps }

/** 手风琴 */
export const Accordion = ({ style, expand = false, lazy = true, children }: AccordionProps) => {
  r(COMPONENT)

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
          : ('auto' as const)
      },
      style
    ],
    [h, style]
  )
  const handleLayout = useCallback(
    (evt: LayoutChangeEvent) => {
      const { height } = evt.nativeEvent.layout
      if (height <= h) return

      runAfter(() => {
        setH(height)
      }, true)
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
    <Animated.View style={animatedStyles}>
      <View onLayout={handleLayout}>{children}</View>
    </Animated.View>
  )
}

export default Accordion
