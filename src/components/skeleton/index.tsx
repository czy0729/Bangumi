/*
 * @Author: czy0729
 * @Date: 2023-03-11 17:17:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 04:00:34
 */
import React from 'react'
import { View } from 'react-native'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { observer } from 'mobx-react'
import { LinearGradient } from 'expo-linear-gradient'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { getSkeletonColor } from './utils'
import { COMPONENT, SHIMMER_COLORS, SHIMMER_COLORS_DARK, SHIMMER_COLORS_TINYGRAIL_DARK } from './ds'
import { styles } from './styles'
import { Props as SkeletonProps } from './types'

export { SkeletonProps, getSkeletonColor }

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

/** 骨架屏渐变动画 */
export const Skeleton = observer(
  ({ shimmerColors, type = 'app', width, height, duration = 1600 }: SkeletonProps) => {
    r(COMPONENT)

    if (
      typeof width !== 'number' ||
      typeof height !== 'number' ||
      Number.isNaN(width) ||
      Number.isNaN(height)
    ) {
      return null
    }

    return (
      <View style={styles.skeleton} pointerEvents='none' removeClippedSubviews>
        <ShimmerPlaceholder
          visible={false}
          width={width}
          height={height}
          shimmerColors={
            shimmerColors ||
            _.select(
              SHIMMER_COLORS,
              type === 'tinygrail' ? SHIMMER_COLORS_TINYGRAIL_DARK : SHIMMER_COLORS_DARK
            )
          }
          duration={duration}
          isInteraction={false}
        />
      </View>
    )
  }
)

export default Skeleton
