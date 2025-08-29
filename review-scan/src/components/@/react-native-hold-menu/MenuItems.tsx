/*
 * @Author: czy0729
 * @Date: 2024-02-19 10:52:35
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-02-19 10:52:35
 */
import React, { memo } from 'react'
import { MenuItemProps } from 'react-native-hold-menu/src/components/menu/types'
import isEqual from 'lodash.isequal'
import MenuItem from './MenuItem'

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
