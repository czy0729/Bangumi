/*
 * @Author: czy0729
 * @Date: 2023-03-11 17:17:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-11 18:29:56
 */
import React from 'react'
import { View } from 'react-native'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'
import { observer } from 'mobx-react-lite'
import { _ } from '@stores'
import { styles } from './styles'
import { Props as SkeletonProps } from './types'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
const shimmerColors = [_.colorBg, _.colorIcon, _.colorBg]
const shimmerColorsDark = [
  _._colorDarkModeLevel1,
  _._colorDarkModeLevel2,
  _._colorDarkModeLevel1
]

export const Skeleton = observer(({ width, height }: SkeletonProps) => {
  if (
    typeof width !== 'number' ||
    typeof height !== 'number' ||
    Number.isNaN(width) ||
    Number.isNaN(height)
  ) {
    return null
  }

  return (
    <View style={styles.skeleton} pointerEvents='none'>
      <ShimmerPlaceholder
        visible={false}
        width={width}
        height={height}
        shimmerColors={_.select(shimmerColors, shimmerColorsDark)}
        duration={1600}
      />
    </View>
  )
})
