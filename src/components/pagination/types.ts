/*
 * @Author: czy0729
 * @Date: 2022-06-03 15:48:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-24 08:54:48
 */
import type { EventKeys, Fn, ViewStyle, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  /** 输入框样式 */
  inputStyle?: ViewStyle

  /** 输入框页码 */
  input: string

  /** 最大页码 */
  pageTotal?: number

  /** 事件埋点 */
  heatmaps?: {
    prev?: EventKeys
    next?: EventKeys
    search?: EventKeys
  }

  /** 上一页回调 */
  onPrev?: Fn

  /** 下一页回调 */
  onNext?: Fn

  /** 输入框变化回调 */
  onChange?: Fn

  /** 输入框键盘提交回调 */
  onSearch?: Fn
}>
