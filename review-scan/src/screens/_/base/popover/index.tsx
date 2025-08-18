/*
 * @Author: czy0729
 * @Date: 2019-06-01 18:25:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-04 16:07:38
 */
import React from 'react'
import { Component, Menu, Popover as PopoverComp, PopoverProps } from '@components'
import { ob } from '@utils/decorators'
import { FROZEN_FN, IOS } from '@constants'
import PopoverOld from './old'
import { COMPONENT } from './ds'

function PopoverWithMenu<ItemT extends string[] | readonly string[]>({
  data,
  menuStyle,
  onSelect = FROZEN_FN,
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
            onSelect={(title, index, evt) => {
              setTimeout(() => {
                onSelect(title, index, evt)
              }, 0)
            }}
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

const Popover = ob(PopoverWithMenu, COMPONENT) as typeof PopoverWithMenu & {
  Old: typeof PopoverOld
}

Popover.Old = PopoverOld

export { Popover }

export default Popover
