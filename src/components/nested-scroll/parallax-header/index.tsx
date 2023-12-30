/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:48:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-29 20:51:37
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
  headerOpacity,
  overflowHeaderOpacity,
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
              justifyContent: 'center',
              height: imageHeight,
              width: width
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
          <Animated.View
            style={[
              styles.mask,
              {
                opacity: headerOpacity
              }
            ]}
          />
          <Animated.View
            style={{
              opacity: overflowHeaderOpacity
            }}
          >
            {children}
          </Animated.View>
        </AnimatedImageBackground>
      </View>
    </NestedScrollViewHeaderAnimated>
  )
}
