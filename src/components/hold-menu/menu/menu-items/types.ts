/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:19:47
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-09 07:19:47
 */
import type { MenuItemProps } from '../../types'

/** MenuItems 属性 */
export type Props = {
  /** 菜单项列表 */
  items: MenuItemProps[]

  /** 菜单项点击参数映射 */
  actionParams?: { [name: string]: unknown[] }
}
