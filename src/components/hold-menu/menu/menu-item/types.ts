/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:19:23
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-09 07:19:23
 */
import type { MenuItemProps } from '../../types'

/** MenuItem 属性 */
export type Props = {
  /** 菜单项 */
  item: MenuItemProps

  /** 是否为最后一项, 最后一项不显示分隔线 */
  isLast?: boolean

  /** 菜单项点击参数映射 */
  actionParams?: { [name: string]: unknown[] }
}
