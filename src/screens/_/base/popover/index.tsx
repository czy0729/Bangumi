/*
 * @Author: czy0729
 * @Date: 2019-06-01 18:25:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-01 11:05:25
 */
import React from 'react'
import { Component, Menu, Popover as PopoverComp, PopoverProps } from '@components'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import PopoverOld from './old'
import { COMPONENT } from './ds'

function PopoverWithMenu<ItemT extends string[] | readonly string[]>({
  data,
  menuStyle,
  onSelect = () => {},
  children,
  ...other
}: PopoverProps<ItemT>) {
  const passProps = IOS
    ? {
        ...other,
        overlay: (
          <Menu
            style={menuStyle}
            data={data || []}
            onSelect={title => setTimeout(() => onSelect(title), 0)}
          />
        )
      }
    : {
        ...other,
        data: data || [],
        onSelect
      }

  return (
    <Component id='base-popover'>
      <PopoverComp key={String((data || []).length)} placement='bottom' {...passProps}>
        {children}
      </PopoverComp>
    </Component>
  )
}

const Popover = ob(PopoverWithMenu, COMPONENT)

// @ts-expect-error
Popover.Old = PopoverOld

export { Popover }
