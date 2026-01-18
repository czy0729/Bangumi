/*
 * @Author: czy0729
 * @Date: 2026-01-18 13:01:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 13:02:25
 */
import { IOS, MENU_MAP } from '@constants'

export const CUSTOM_BTN_KEYS = Object.keys(MENU_MAP).filter(key => {
  const item = MENU_MAP[key] || {}

  let flag = true
  if (IOS) flag = item.ios !== false

  return flag && item.key !== 'Open'
})

export const CUSTOM_BTN_DEFAULT = {
  name: '不设置',
  icon: 'md-do-not-disturb-alt'
} as const
