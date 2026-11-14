/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 */
import type { MenuItem } from '@types'

export type Props = {
  /** 是否显示全部功能 */
  all: boolean

  /** 底部安全区高度 */
  bottom: number

  /** 显示的菜单 */
  visibleMenus: MenuItem[]

  /** 隐藏的菜单 */
  hiddenMenus: MenuItem[]
}
