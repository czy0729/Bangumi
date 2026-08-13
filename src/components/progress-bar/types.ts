/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import type { ViewStyle } from 'react-native'
import type { WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  /** 进度 0-100 */
  percent?: number

  /** 进度条样式 */
  barStyle?: ViewStyle

  /** 已测量的容器宽度, 传入后不再使用 onLayout 测量 */
  wrapWidth?: number

  /** fixed 模式绝对定位到顶部 */
  position?: 'fixed' | 'normal'

  /** 是否填充未完成部分背景, 默认 true */
  unfilled?: boolean

  /** 进入时宽度 0 → 目标值动画 */
  appearTransition?: boolean
}>
