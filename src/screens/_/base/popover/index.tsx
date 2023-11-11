/*
 * @Author: czy0729
 * @Date: 2019-06-01 18:25:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-10 00:03:08
 */
import React from 'react'
import { Popover as CompPopover, PopoverProps, Menu, Component } from '@components'
import { Popover as CompPopoverOld } from '@components/popover/old'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'

const Popover = ob(
  ({ data = [], menuStyle, onSelect = () => {}, children, ...other }: PopoverProps) => {
    const popoverProps = IOS
      ? {
          overlay: (
            <Menu
              style={menuStyle}
              data={data}
              onSelect={title => setTimeout(() => onSelect(title), 0)}
            />
          )
        }
      : {
          data,
          onSelect
        }

    return (
      <Component id='base-popover'>
        <CompPopover
          key={String(data.length)}
          placement='bottom'
          {...popoverProps}
          {...other}
        >
          {children}
        </CompPopover>
      </Component>
    )
  }
)

// @ts-expect-error
Popover.Old = ob(
  ({ data = [], menuStyle, onSelect = Function.prototype, children, ...other }) => {
    const popoverProps = IOS
      ? {
          overlay: (
            <Menu
              style={menuStyle}
              data={data}
              onSelect={title => setTimeout(() => onSelect(title), 0)}
            />
          )
        }
      : {
          data,
          onSelect
        }

    return (
      <CompPopoverOld
        key={String(data.length)}
        placement='bottom'
        {...popoverProps}
        {...other}
      >
        {children}
      </CompPopoverOld>
    )
  }
)

export { Popover }
