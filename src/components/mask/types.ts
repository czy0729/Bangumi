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

  /** 点击遮罩回调 */
  onPress: () => void
}>
