/*
 * @Author: czy0729
 * @Date: 2024-05-17 04:22:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-25 20:29:31
 */
import React, { forwardRef, useCallback } from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Props } from './types'

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
    <Animated.FlatList
      ref={ref}
      {...other}
      skipEnteringExitingAnimations
      renderItem={renderAnimatedItem}
    />
  )
}

export default forwardRef(EnteringExiting)
