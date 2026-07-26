/*
 * @Author: czy0729
 * @Date: 2025-02-02 21:54:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 05:53:46
 */
import type { Fn, WithViewStyles } from '@types'

export type MaskProps = WithViewStyles<{
  /** 是否使用线性渐变遮罩 */
  linear?: boolean

  /** 点击遮罩回调 */
  onPress: Fn
}>
