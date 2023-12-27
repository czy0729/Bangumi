/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:48:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-27 15:50:46
 */
import React from 'react'
import { Animated, ImageBackground, useWindowDimensions, View } from 'react-native'
import { NestedScrollViewHeader } from '@sdcx/nested-scroll'
import { styles } from './styles'
import { Props } from './types'

const NestedScrollViewHeaderAnimated =
  Animated.createAnimatedComponent(NestedScrollViewHeader)
const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground)

export function ParallaxHeader({
  imageHeight,
  topBarHeight,
  translateYUp,
  translateYDown,
  scale,
  imageStyle,
  imageSource,
  onScroll,
  children
}: Props) {
  const { width } = useWindowDimensions()

  return (
    <NestedScrollViewHeaderAnimated stickyHeight={topBarHeight} onScroll={onScroll}>
      <View
        style={[
          styles.imgContainer,
          {
            marginTop: -imageHeight * 4,
            paddingTop: imageHeight * 4
          }
        ]}
      >
        <AnimatedImageBackground
          style={[
            {
              height: imageHeight,
              width: width * 1.2,
              justifyContent: 'center'
            },
            {
              transform: [
                { scale: scale },
                { translateY: translateYUp },
                { translateY: translateYDown }
              ]
            },
            imageStyle
          ]}
          source={imageSource}
        >
          {children}
        </AnimatedImageBackground>
      </View>
    </NestedScrollViewHeaderAnimated>
  )
}
