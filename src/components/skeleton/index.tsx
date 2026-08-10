/*
 * @Author: czy0729
 * @Date: 2023-03-11 17:17:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-11 00:50:00
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { WEB } from '@constants'
import { Shimmer } from './shimmer'
import { getShimmerColors, getSkeletonColor } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

export { getSkeletonColor }

import type { Props as SkeletonProps } from './types'
export type { SkeletonProps }

/** 骨架屏渐变动画 */
export const Skeleton = observer(
  ({ shimmerColors, type = 'app', width, height, duration = 1600 }: SkeletonProps) => {
    r(COMPONENT)

    if (
      WEB ||
      typeof width !== 'number' ||
      typeof height !== 'number' ||
      Number.isNaN(width) ||
      Number.isNaN(height)
    ) {
      return null
    }

    const colors = shimmerColors || getShimmerColors(type)

    return (
      <View style={styles.skeleton} pointerEvents='none'>
        <Shimmer width={width} height={height} colors={colors} duration={duration} />
      </View>
    )
  }
)

export default Skeleton
