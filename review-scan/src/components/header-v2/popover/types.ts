/*
 * @Author: czy0729
 * @Date: 2023-12-04 15:42:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-22 07:57:28
 */
import { ColorValue, IconfontNames, ReactNode, ViewStyle } from '@types'
import { PopoverData } from '../../popover'

export type Props<Data extends PopoverData> = {
  style?: ViewStyle

  /** 图标名字 */
  name?: IconfontNames

  /** 图标大小 */
  size?: number

  /** 图标颜色 */
  color?: ColorValue

  /** Popover data */
  data?: Data

  /** 菜单样式 */
  menuStyle?: ViewStyle

  /** Popover onSelect */
  onSelect?: (title?: Data[number]) => any

  children?: ReactNode
}
