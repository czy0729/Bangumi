/*
 * @Author: czy0729
 * @Date: 2025-09-12 18:50:38
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-09-12 18:50:38
 */
import { TransformOriginAnchorPosition } from '../../utils/calculations'

export type MenuItemProps = {
  text: string
  icon?: string
  onPress?: (...args: any[]) => void
  isTitle?: boolean
  isDestructive?: boolean
  withSeparator?: boolean
}

export type MenuListProps = {
  items: MenuItemProps[]
}

export type MenuInternalProps = {
  items: MenuItemProps[]
  itemHeight: number
  itemWidth: number
  itemY: number
  itemX: number
  anchorPosition: TransformOriginAnchorPosition
  menuHeight: number
  transformValue: number
  actionParams: {
    [name: string]: (string | number)[]
  }
}
