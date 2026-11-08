/*
 * @Author: czy0729
 * @Date: 2025-03-16 06:39:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 11:40:00
 *
 * FormItem 组件 Props
 */
import type { ViewStyle } from '@types'
import type { STATE } from '../../store/ds'

export type Props = {
  /** 容器样式 */
  style?: ViewStyle

  /** 状态字段名 */
  name: keyof typeof STATE
}
