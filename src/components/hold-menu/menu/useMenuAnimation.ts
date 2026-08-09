/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:21:52
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-09 07:21:52
 */
import { useAnimatedProps, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'
import { MENU_ANIMATION_DURATION, SPRING_CONFIGURATION, SPRING_CONFIGURATION_MENU } from '../ds'
import { useHoldMenu } from '../context'
import { getMenuHeight, getMenuWidth } from '../utils'

import type { ViewProps } from 'react-native'
import type { TransformArrayItem } from 'react-native-reanimated'
import type { MenuAnimationProps } from './types'

/** 菜单容器动画控制器: 位置/尺寸/缩放/位移, 由 active/position 驱动 */
export const useMenuAnimation = ({ items }: MenuAnimationProps) => {
  const { active, position } = useHoldMenu()

  const defaultWidth = getMenuWidth()
  // 非零默认高度, 避免首帧 BlurView 以 0 高度挂载导致模糊不渲染
  const defaultHeight = getMenuHeight(items)

  const animatedStyle = useAnimatedStyle(() => {
    const pos = position.value
    const isActive = active.value === 1
    const left = pos?.left ?? 0
    const top = pos?.top ?? 0
    const width = pos?.width ?? defaultWidth
    const height = pos?.height ?? defaultHeight
    const tY = pos?.tY ?? 0
    const originX = pos?.originX ?? width / 2
    const originY = pos?.originY ?? 0

    // 缩放原点需用菜单本地坐标, 即相对 left/top 的偏移
    // RN 默认围绕视图中心缩放, 故先平移到原点再缩放再移回
    // originY 基于位移后的最终位置, 需扣除 tY 使缩放锚点跟随位移后的按钮
    const originLocalX = originX - left
    const originLocalY = originY - top - tY
    const translateX = originLocalX - width / 2
    const translateY = originLocalY - height / 2

    const transform = [
      // 与按钮同步位移, 菜单放不下时整体向合适方向挤开
      {
        translateY: isActive
          ? withSpring(tY, SPRING_CONFIGURATION)
          : withTiming(0, { duration: MENU_ANIMATION_DURATION })
      },
      { translateX },
      { translateY },
      {
        scale: isActive
          ? withSpring(1, SPRING_CONFIGURATION_MENU)
          : withTiming(0, { duration: MENU_ANIMATION_DURATION })
      },
      { translateX: -translateX },
      { translateY: -translateY }
    ] as TransformArrayItem[]

    return {
      left,
      top,
      width,
      height,
      opacity: withTiming(isActive ? 1 : 0, { duration: MENU_ANIMATION_DURATION }),
      transform
    }
  })

  const animatedProps = useAnimatedProps<ViewProps>(() => ({
    pointerEvents: active.value === 1 ? 'auto' : 'none'
  }))

  return { animatedStyle, animatedProps }
}

