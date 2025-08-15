/*
 * 删除过多无用代码
 * @Author: czy0729
 * @Date: 2022-01-04 13:19:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-05 02:33:58
 */
import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { Screen } from 'react-native-screens'
import createPointerEventsContainer from 'react-navigation-stack/src/views/StackView/createPointerEventsContainer'

const EPS = 1e-5

function Card({
  pointerEvents,
  position,
  transparent,
  scene: { index, isActive },
  animatedStyle = {},
  onComponentRef,
  children
}) {
  const active = useMemo(
    () =>
      transparent || isActive
        ? 1
        : position.interpolate({
            inputRange: [index, index + 1 - EPS, index + 1],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp'
          }),
    [index, isActive, position, transparent]
  )

  const { shadowOpacity, overlayOpacity, ...containerAnimatedStyle } = animatedStyle
  const styles = useMemo(
    () => [StyleSheet.absoluteFill, containerAnimatedStyle],
    [containerAnimatedStyle]
  )

  return (
    <Screen
      style={styles}
      pointerEvents={pointerEvents}
      active={active}
      onComponentRef={onComponentRef}
    >
      {children}
    </Screen>
  )
}

export default createPointerEventsContainer(Card)
