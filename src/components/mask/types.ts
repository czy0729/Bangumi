/*
 * @Author: czy0729
 * @Date: 2025-02-02 21:54:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 12:00:00
 */
import type { ViewStyle as RNViewStyle } from 'react-native'
import type { AnimatedStyle } from 'react-native-reanimated'
import type { Override, ViewStyle, WithViewStyles } from '@types'

/** 遮罩渐变色 [顶, 中, 底] */
export type MaskColors = readonly [string, string, string]

/** 遮罩样式: 普通样式, 或调用方自己驱动的 Reanimated 动画样式 (例如用 progress 控制 opacity) */
export type MaskStyle = AnimatedStyle<RNViewStyle> | ViewStyle

export type Props = Override<
  WithViewStyles<{
    /** 是否使用线性渐变遮罩 */
    linear?: boolean

    /**
     * 是否显示, 受控显隐动画 (淡入淡出, 淡出结束后 showValue 置为 false, 组件常驻挂载)
     * - 传 `show` 才启用内置淡入淡出
     * - 不传则始终渲染且不做动画 (行为与旧版一致); 调用方自己要驱动 opacity 时也不要传 `show`,
     *   避免两段动画写在同一个节点上互相覆盖
     */
    show?: boolean

    /** 点击遮罩回调 */
    onPress: () => void
  }>,
  {
    /** 遮罩样式, 支持 Reanimated 动画样式 (调用方自己驱动 opacity 时直接传动画样式) */
    style?: MaskStyle
  }
>
