/*
 * @Author: czy0729
 * @Date: 2026-08-11 00:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-11 00:50:00
 */
import React from 'react'
import { Animated as RNAnimated, StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { useShimmerAnimation, useShimmerAnimationReanimated } from './hooks'
import { GRADIENT, USE_REANIMATED } from './ds'
import { styles } from './styles'

import type { ShimmerProps } from './types'

const Gradient = ({ colors }: { colors: [string, string, string] }) => (
  <LinearGradient
    colors={colors}
    start={GRADIENT.start}
    end={GRADIENT.end}
    locations={GRADIENT.locations}
    style={styles.gradient}
  />
)

const NativeShimmer = ({ width, height, colors, duration }: ShimmerProps) => {
  const animatedStyle = useShimmerAnimation(width, duration)
  return (
    <View style={{ width, height, backgroundColor: colors[0], overflow: 'hidden' }}>
      <RNAnimated.View style={[StyleSheet.absoluteFillObject, animatedStyle]}>
        <Gradient colors={colors} />
      </RNAnimated.View>
    </View>
  )
}

const ReanimatedShimmer = ({ width, height, colors, duration }: ShimmerProps) => {
  const animatedStyle = useShimmerAnimationReanimated(width, duration)
  return (
    <View style={{ width, height, backgroundColor: colors[0], overflow: 'hidden' }}>
      <Animated.View style={[StyleSheet.absoluteFillObject, animatedStyle]}>
        <Gradient colors={colors} />
      </Animated.View>
    </View>
  )
}

/** 骨架屏扫光组件 */
export const Shimmer = USE_REANIMATED ? ReanimatedShimmer : NativeShimmer
