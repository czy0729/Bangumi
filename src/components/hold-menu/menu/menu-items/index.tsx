/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:19:52
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-09 07:19:52
 */
import React, { memo } from 'react'
import MenuItem from '../menu-item'

import type { Props } from './types'

/** 菜单项列表 */
function MenuItemsComponent({ items, actionParams }: Props) {
  return (
    <>
      {items.map((item, index) => (
        <MenuItem
          key={index}
          item={item}
          isLast={items.length === index + 1}
          actionParams={actionParams}
        />
      ))}
    </>
  )
}

const MenuItems = memo(MenuItemsComponent)

export default MenuItems
