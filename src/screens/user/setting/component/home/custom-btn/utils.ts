/*
 * @Author: czy0729
 * @Date: 2026-08-28 01:36:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 02:23:34
 */
import { MENU_MAP } from '@constants'
import { CUSTOM_BTN_DEFAULT } from './ds'

import type { MenuItem } from '@types'

/** 按设置值取菜单项, 未设置时返回默认项 */
export function getMenu(key: string): Partial<MenuItem> {
  if (key in MENU_MAP) return MENU_MAP[key as MenuItem['key']] || CUSTOM_BTN_DEFAULT
  return CUSTOM_BTN_DEFAULT
}
