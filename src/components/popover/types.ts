/*
 * @Author: czy0729
 * @Date: 2022-05-28 07:39:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-22 05:03:41
 */
import { ReactNode, ViewStyle } from '@types'

export type Props<T extends string[] | readonly string[] = string[]> = {
  style?: ViewStyle

  /** 菜单项 */
  data?: T

  /** 菜单位置 (iOS only) */
  placement?: string

  /** 菜单样式 (iOS only) */
  menuStyle?: ViewStyle

  contentStyle?: ViewStyle

  /** 菜单 Node (iOS only) */
  overlay?: ReactNode

  hitSlop?: Record<'top' | 'right' | 'bottom' | 'left', number>

  /** 菜单选择 */
  onSelect?: (title?: T[number], index?: number) => any

  /** 菜单长按选择 (不推荐使用) */
  onLongPress?: (title?: T[number]) => any

  children?: ReactNode
}
