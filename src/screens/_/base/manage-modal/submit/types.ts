/*
 * @Author: czy0729
 * @Date: 2025-10-21 15:32:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-16 10:20:00
 */
import type { Private, ViewStyle } from '@types'

export type Props = {
  disabled: boolean
  privacy: Private
  onTogglePrivacy: () => void
  onSubmit: () => void

  /** 提交成功后按钮翻面到的文案: 最新真实收藏状态 (如「在读」), 为空不翻面 */
  flipLabel?: string

  /** 弹窗再次打开时递增, 重挂载提交按钮以复位翻面状态 */
  flipKey?: number
}

export type FlipBtnProps = {
  style?: ViewStyle
  disabled: boolean
  flipLabel: string
  onSubmit: () => void
}
