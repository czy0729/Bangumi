/*
 * @Author: czy0729
 * @Date: 2025-05-13 14:39:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 12:00:00
 */
import type { PropsWithChildren } from 'react'
import type { Animated } from 'react-native'
import type { WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    /** 是否显示 */
    show: boolean

    /** 弹出方向 (默认 right) */
    position?: 'left' | 'right'

    /** 遮罩颜色 (默认黑色半透明) */
    maskColor?: string

    /** iOS 允许从靠近遮罩一侧滑动关闭 */
    swipeToClose?: boolean

    /** 切换回调 */
    onToggle: () => void
  }>
>

export type MaskProps = {
  /** 开合进度 */
  progress: Animated.Value

  /** 遮罩颜色 (默认黑色半透明) */
  color?: string

  /** 切换回调 */
  onToggle: () => void
}

export type BodyProps = PropsWithChildren<
  WithViewStyles<{
    /** 开合进度 */
    progress: Animated.Value

    /** 弹出方向 (默认 right) */
    position?: 'left' | 'right'

    /** 是否显示 */
    show: boolean

    /** iOS 允许从靠近遮罩一侧滑动关闭 */
    swipeToClose?: boolean

    /** 切换回调 */
    onToggle: () => void
  }>
>
