/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:54:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-27 16:10:47
 */
import React from 'react'
import { Animated } from 'react-native'
import { useAnimatedNavbar } from '../hooks/useAnimatedNavbar'
import { styles } from './styles'
import { Props } from './types'

export function AnimatedNavbar({
  scroll,
  imageHeight,
  headerHeight,
  statusBarHeight,
  OverflowHeaderComponent,
  TopNavbarComponent
}: Props) {
  const [headerOpacity, overflowHeaderOpacity] = useAnimatedNavbar(
    scroll,
    imageHeight,
    headerHeight
  )

  return (
    <>
      {!!TopNavbarComponent && (
        <Animated.View
          style={[
            styles.container,
            styles.header,
            {
              paddingTop: statusBarHeight,
              zIndex: headerOpacity,
              height: headerHeight,
              opacity: headerOpacity
            }
          ]}
        >
          {TopNavbarComponent}
        </Animated.View>
      )}
      {!!OverflowHeaderComponent && (
        <Animated.View
          style={[
            styles.container,
            styles.overflowHeader,
            {
              paddingTop: statusBarHeight,
              zIndex: overflowHeaderOpacity,
              height: headerHeight,
              opacity: overflowHeaderOpacity
            }
          ]}
        >
          {OverflowHeaderComponent}
        </Animated.View>
      )}
    </>
  )
}
