/*
 * @Author: czy0729
 * @Date: 2021-09-26 13:37:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-09-27 11:37:35
 */
import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { Animated } from 'react-native'

export const Accordion = ({ style, expand, children }) => {
  const [show, setShow] = useState(expand)
  const [h, setH] = useState(0)
  const aH = useRef(new Animated.Value(expand ? 1 : 0))
  const styles = useMemo(
    () => [
      style,
      {
        overflow: 'hidden',
        height: h
          ? aH.current.interpolate({
              inputRange: [0, 1],
              outputRange: [0, h]
            })
          : 'auto'
      }
    ],
    [h, aH]
  )
  const onLayout = useCallback(
    event => {
      if (!expand) return

      const { height } = event.nativeEvent.layout
      setH(height)
    },
    [expand, h]
  )

  useEffect(() => {
    if (expand) setShow(true)
    if (h) {
      Animated.timing(aH.current, {
        toValue: expand ? 1 : 0,
        duration: 160,
        useNativeDriver: false
      }).start()

      if (!expand) {
        setTimeout(() => {
          setShow(false)
        }, 170)
      }
    }
  }, [expand, h, aH])

  return (
    show && (
      <Animated.View style={styles} onLayout={h ? undefined : onLayout}>
        {children}
      </Animated.View>
    )
  )
}
