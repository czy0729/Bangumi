/*
 * @Author: czy0729
 * @Date: 2026-11-13 13:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 13:00:00
 *
 * 发现页菜单数据
 */
import { IOS, MENU_MAP, MENU_MAP_STORYBOOK, WEB } from '@constants'

import type { MenuItem, MenuMap } from '@types'

/** 根据设置自定义菜单构造菜单数据 */
export function getMenus(discoveryMenu: MenuItem['key'][] = []) {
  if (!discoveryMenu.length) return []

  let menuMap: MenuMap = { ...MENU_MAP }
  if (WEB) {
    menuMap = {
      ...menuMap,
      ...MENU_MAP_STORYBOOK
    }
  }

  let menus: MenuItem[] = []

  // 若 discoveryMenu 的 key 不存在在 defaultMenu 里, 需要过滤
  discoveryMenu.forEach(key => {
    const item = menuMap[key]
    if (item) {
      menus.push(item)
      delete menuMap[key]
    }
  })

  // 若有新菜单, 在 key=Open 前插入
  const newMenuKeys = Object.keys(menuMap) as MenuItem['key'][]
  if (newMenuKeys.length) {
    const openIndex = menus.findIndex(item => item.key === 'Open')
    const newMenus = newMenuKeys.reduce<MenuItem[]>((acc, key) => {
      const item = menuMap[key]
      if (item) acc.push(item)
      return acc
    }, [])
    menus = [...menus.slice(0, openIndex), ...newMenus, ...menus.slice(openIndex, menus.length)]
  }

  if (WEB) return menus.filter(item => item.web !== false)

  if (IOS) return menus.filter(item => item.ios !== false)

  return menus
}

/** 显示的菜单 (Open 之前), 不含 Open / More */
export function getVisibleMenus(menus: MenuItem[]) {
  const openIndex = menus.findIndex(item => item.key === 'Open')
  const source = openIndex === -1 ? menus : menus.slice(0, openIndex)

  return source.filter(item => item.key !== 'Open' && item.key !== 'More')
}

/** 隐藏的菜单 (Open 之后), 不含 Open / More */
export function getHiddenMenus(menus: MenuItem[]) {
  const openIndex = menus.findIndex(item => item.key === 'Open')
  if (openIndex === -1) return []

  return menus.slice(openIndex + 1).filter(item => item.key !== 'More')
}
