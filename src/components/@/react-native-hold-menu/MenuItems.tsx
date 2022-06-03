import React, { memo } from 'react'
import MenuItem from './MenuItem'
import isEqual from 'lodash.isequal'
import { MenuItemProps } from 'react-native-hold-menu/src/components/menu/types'

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
