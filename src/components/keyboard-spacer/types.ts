/*
 * @Author: czy0729
 * @Date: 2022-08-31 19:54:13
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-31 19:54:13
 */
import type { WithViewStyles } from '@types'

/** 键盘占位组件 */
export type Props = WithViewStyles<{
  /** 顶部间距 */
  topSpacing?: number

  /** 是否启用动画 */
  animate?: boolean

  /** 键盘状态变化回调 */
  onToggle?: (toggle?: boolean, keyboardSpace?: number) => void
}>
