/*
 * @Author: czy0729
 * @Date: 2023-12-04 15:42:54
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-12-04 15:42:54
 */
import { ColorValue, IconfontNames, ReactNode, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle

  /** 图标名字 */
  name?: IconfontNames

  /** 图标大小 */
  size?: number

  /** 图标颜色 */
  color?: ColorValue

  /** Popover data */
  data?: string[] | readonly string[]

  /** 菜单样式 */
  menuStyle?: ViewStyle

  /** Popover onSelect */
  onSelect?: (title?: string) => any

  children?: ReactNode
}
