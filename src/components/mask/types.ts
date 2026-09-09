/*
 * @Author: czy0729
 * @Date: 2025-02-02 21:54:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 05:50:32
 */
import type { WithViewStyles } from '@types'

/** 遮罩渐变色 [顶, 中, 底] */
export type MaskColors = readonly [string, string, string]

export type Props = WithViewStyles<{
  /** 是否使用线性渐变遮罩 */
  linear?: boolean

  /**
   * 是否显示, 受控显隐动画 (淡入淡出, 淡出结束后再卸载)
   * 不传则始终渲染, 行为与旧版一致
   */
  show?: boolean

  /** 点击遮罩回调 */
  onPress: () => void
}>
