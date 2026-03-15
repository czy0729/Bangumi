/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:48:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-14 16:30:03
 */
import React from 'react'
import { Animated, ImageBackground, useWindowDimensions, View } from 'react-native'
import { NestedScrollViewHeader } from '@sdcx/nested-scroll'
import { styles } from './styles'

import type { ViewStyle } from '@types'
import type { Props } from './types'

const NestedScrollViewHeaderAnimated = Animated.createAnimatedComponent(NestedScrollViewHeader)
const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground)

export function ParallaxHeader({
  height,
  topBarHeight,
  translateYUp,
  translateYDown,
  scale,
  imageStyle,
  imageSource,
  blurRadius,
  headerOpacity,
  overflowHeaderOpacity,
  onScroll,
  children
}: Props) {
  const { width } = useWindowDimensions()

  const backgroundStyle = [
    {
      justifyContent: 'center',
      width,
      height
    },
    {
      transform: [{ scale }, { translateY: translateYUp }, { translateY: translateYDown }]
    },
    imageStyle
  ] as ViewStyle

  const elContent = (
    <>
      <View style={styles.layer} />
      <Animated.View
        style={[
          styles.mask,
          {
            opacity: headerOpacity
          }
        ]}
      />
      <Animated.View
        style={[
          styles.overflow,
          {
            opacity: overflowHeaderOpacity
          }
        ]}
      >
        {children}
      </Animated.View>
    </>
  )

  return (
    <NestedScrollViewHeaderAnimated stickyHeight={topBarHeight} onScroll={onScroll}>
      <View
        style={[
          styles.container,
          {
            marginTop: -height * 4,
            paddingTop: height * 4
          }
        ]}
      >
        {imageSource ? (
          <AnimatedImageBackground
            key={String(imageSource?.uri)}
            style={backgroundStyle}
            source={imageSource}
            blurRadius={blurRadius}
          >
            {elContent}
          </AnimatedImageBackground>
        ) : (
          <Animated.View style={backgroundStyle}>{elContent}</Animated.View>
        )}
      </View>
    </NestedScrollViewHeaderAnimated>
  )
}
