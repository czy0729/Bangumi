/*
 * @Author: czy0729
 * @Date: 2025-09-12 18:50:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-12 19:15:52
 */
import React, { memo } from 'react'
import isEqual from 'lodash.isequal'
import MenuItem from './MenuItem'
import { MenuItemProps } from './types'

const MenuItemsComponent = ({ items }: { items: MenuItemProps[] }) => {
  return (
    <>
      {items.map((item: MenuItemProps, index: number) => {
        return <MenuItem key={index} item={item} isLast={items.length === index + 1} />
      })}
    </>
  )
}

const MenuItems = memo(MenuItemsComponent, isEqual)

export default MenuItems
