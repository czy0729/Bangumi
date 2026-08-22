/*
 * @Author: czy0729
 * @Date: 2024-05-17 04:22:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-07 19:17:25
 */
import React, { forwardRef, useCallback } from 'react'
import { FlatList, View } from 'react-native'
import Animated, { FadeInDown, LayoutAnimationConfig } from 'react-native-reanimated'
import { styles } from './styles'

import type { ListRenderItemInfo } from 'react-native'
import type { Props } from './types'

/**
 * 进出场动画列表
 * - 前 N 项包 FadeInDown 做进场动画, 与列表组件无关
 * - 不使用 reanimated 的 Animated.FlatList: 其内部会无条件覆盖 CellRendererComponent,
 *   导致 estimatedItemHeight 的测高组件与调试层无法挂载
 * - LayoutAnimationConfig 还原其 skipEntering/skipExiting 语义:
 *   随列表同时首挂载的 cell 不播进场动画 (进入页面无动画), 数据变动后重新挂载的才播
 */
function EnteringExiting<ItemT>(
  { skipEnteringExitingAnimations = 10, renderItem, ...other }: Props<ItemT>,
  ref: React.ForwardedRef<FlatList<ItemT>>
) {
  const renderAnimatedItem = useCallback(
    (info: ListRenderItemInfo<ItemT>) => {
      const el = renderItem(info)
      if (info.index >= skipEnteringExitingAnimations) return el

      return <Animated.View entering={FadeInDown.duration(640)}>{el}</Animated.View>
    },
    [skipEnteringExitingAnimations, renderItem]
  )

  return (
    <View style={styles.flatList}>
      <LayoutAnimationConfig skipEntering skipExiting>
        <FlatList ref={ref} {...other} renderItem={renderAnimatedItem} />
      </LayoutAnimationConfig>
    </View>
  )
}

export default forwardRef(EnteringExiting)
