/*
 * @Author: czy0729
 * @Date: 2026-01-18 13:01:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 02:16:02
 */
import { IOS, MENU_MAP } from '@constants'

import type { MenuItem } from '@types'

export const CUSTOM_BTN_KEYS = (Object.keys(MENU_MAP) as MenuItem['key'][]).filter(key => {
  const item = MENU_MAP[key]
  if (!item) return false

  let flag = true
  if (IOS) flag = item.ios !== false

  return flag && item.key !== 'Open'
})

export const CUSTOM_BTN_DEFAULT = {
  name: '不设置',
  icon: 'md-do-not-disturb-alt'
} as const
