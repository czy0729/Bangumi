/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:54:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 15:57:57
 */
import React from 'react'
import { Animated } from 'react-native'
import { styles } from './styles'
import { Props } from './types'

export function AnimatedNavbar({
  statusBarHeight,
  headerHeight,
  headerOpacity,
  overflowHeaderOpacity,
  OverflowHeaderComponent,
  TopNavbarComponent
}: Props) {
  return (
    <>
      {!!TopNavbarComponent && (
        <Animated.View
          style={[
            styles.container,
            styles.header,
            {
              zIndex: headerOpacity,
              height: headerHeight,
              paddingTop: statusBarHeight,
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
