/*
 * @Author: czy0729
 * @Date: 2022-09-23 11:24:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-24 11:52:02
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { LinearGradient } from 'expo-linear-gradient'
import { Component } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { Tag } from '../tag'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { LayoutChangeEvent } from 'react-native'
import type { Props as TagsProps } from './types'
export type { TagsProps }

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

export const Tags = observer(
  ({ style, contentContainerStyle, value = [], active = [], limit, ...other }: TagsProps) => {
    r(COMPONENT)

    // 使用共享变量记录滚动位置
    const scrollX = useSharedValue(0)
    const contentWidth = useSharedValue(0)
    const containerWidth = useSharedValue(0)

    const hasLimit = limit !== undefined && value.length > limit
    const displayData = hasLimit ? value.slice(0, limit) : value
    const extraCount = value.length - limit

    const handleLayout = useCallback(
      (e: LayoutChangeEvent) => {
        containerWidth.value = e.nativeEvent.layout.width
      },
      [containerWidth]
    )

    const handleContentSizeChange = useCallback(
      (w: number) => {
        contentWidth.value = w
      },
      [contentWidth]
    )

    // 滚动监听
    const handleScroll = useAnimatedScrollHandler({
      onScroll: event => {
        scrollX.value = event.contentOffset.x
      }
    })

    // 左侧遮罩动画样式：滚动距离在 0 到 20 之间完成透明度从 0 到 1 的过渡
    const leftMaskStyle = useAnimatedStyle(() => ({
      opacity: interpolate(scrollX.value, [0, 20], [0, 1], Extrapolation.CLAMP)
    }))

    // 右侧遮罩动画样式：剩余距离在 0 到 20 之间完成透明度从 1 到 0 的过渡
    const rightMaskStyle = useAnimatedStyle(() => {
      const maxScroll = contentWidth.value - containerWidth.value

      return {
        opacity: interpolate(
          scrollX.value,
          [maxScroll - 20, maxScroll],
          [1, 0],
          Extrapolation.CLAMP
        )
      }
    })

    if (!value || !value.length) return null

    const maskColors = [
      `rgba(${_.colorPlainRaw.join()}, 1)`,
      `rgba(${_.colorPlainRaw.join()}, 0)`
    ] as const

    return (
      <Component id='base-tags'>
        <View onLayout={handleLayout}>
          <Animated.ScrollView
            {...SCROLL_VIEW_RESET_PROPS}
            {...other}
            style={stl(styles.tags, style)}
            contentContainerStyle={stl(styles.container, contentContainerStyle)}
            horizontal
            onContentSizeChange={handleContentSizeChange}
            onScroll={handleScroll}
          >
            {displayData.map((item: string) => (
              <Tag
                key={item}
                style={_.mr.sm}
                value={item}
                type={active.includes(item) ? 'warning' : undefined}
              />
            ))}
            {hasLimit && <Tag value={`+${extraCount}`} />}
          </Animated.ScrollView>

          <AnimatedLinearGradient
            style={[styles.leftMask, leftMaskStyle]}
            colors={maskColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            pointerEvents='none'
          />

          <AnimatedLinearGradient
            style={[styles.rightMask, rightMaskStyle]}
            // @ts-ignore
            colors={[...maskColors].reverse()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            pointerEvents='none'
          />
        </View>
      </Component>
    )
  }
)

export default Tags
