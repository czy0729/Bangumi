/*
 * @Author: czy0729
 * @Date: 2022-05-28 07:39:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-12 01:33:52
 */
import { ReactNode, ViewStyle } from '@types'

export type PopoverData = string[] | readonly string[]

export type Props<Data extends PopoverData> = {
  style?: ViewStyle

  /** 菜单项 */
  data?: Data

  /** 菜单位置 (iOS only) */
  placement?: string

  /** 菜单样式 (iOS only) */
  menuStyle?: ViewStyle

  contentStyle?: ViewStyle

  /** 菜单 Node (iOS only) */
  overlay?: ReactNode

  hitSlop?: Record<'top' | 'right' | 'bottom' | 'left', number>

  activateOn?: 'tap' | 'hold'

  /** 菜单选择 */
  onSelect?: (
    title?: Data[number],
    index?: number,
    evt?: {
      pageX?: number
      pageY?: number
    }
  ) => any

  /** 菜单长按选择 (不推荐使用) */
  // onLongPress?: (title?: Data[number]) => any

  children?: ReactNode
}
