/*
 * @Author: czy0729
 * @Date: 2021-07-16 14:21:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-17 22:25:03
 */
import { _ } from '@stores'
import { IOS, MENU_MAP, MENU_MAP_STORYBOOK, WEB } from '@constants'

import type { MenuItem } from '@types'

export const COMPONENT = 'Discovery'

export const INITIAL_RENDER_NUMS_XS = _.device(Math.floor(_.window.contentWidth / 80) + 1, 0)

/** 根据设置自定义菜单构造菜单数据 */
export function getMenus(discoveryMenu: MenuItem['key'][] = []) {
  if (!discoveryMenu.length) return []

  let menuMap = { ...MENU_MAP }
  if (WEB) {
    menuMap = {
      ...menuMap,
      ...MENU_MAP_STORYBOOK
    }
  }

  let menus: MenuItem[] = []

  // 若 discoveryMenu 的 key 不存在在 defaultMenu 里, 需要过滤
  discoveryMenu.forEach(key => {
    if (menuMap[key]) {
      menus.push(menuMap[key])
      delete menuMap[key]
    }
  })

  // 若有新菜单, 在 key=Open 前插入
  const newMenuKeys = Object.keys(menuMap)
  if (newMenuKeys.length) {
    const openIndex = menus.findIndex(item => item.key === 'Open')
    const newMenus = newMenuKeys.map(item => menuMap[item])
    menus = [...menus.slice(0, openIndex), ...newMenus, ...menus.slice(openIndex, menus.length)]
  }

  if (WEB) return menus.filter(item => item.web !== false)

  if (IOS) return menus.filter(item => item.ios !== false)

  return menus
}

export const linearColor = [
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0.64)',
  'rgba(0, 0, 0, 0.84)'
] as const
