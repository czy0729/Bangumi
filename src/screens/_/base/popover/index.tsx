/*
 * @Author: czy0729
 * @Date: 2019-06-01 18:25:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:47:10
 */
import React from 'react'
import { Component, Menu, Popover as CompPopover, PopoverProps } from '@components'
import { Popover as CompPopoverOld } from '@components/popover/old'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { COMPONENT } from './ds'

const Popover = ob(
  ({
    data = [],
    menuStyle,
    onSelect = () => {},
    children,
    ...other
  }: PopoverProps<typeof data>) => {
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
        <CompPopover key={String(data.length)} placement='bottom' {...popoverProps} {...other}>
          {children}
        </CompPopover>
      </Component>
    )
  },
  COMPONENT
)

// @ts-expect-error
Popover.Old = ob(({ data = [], menuStyle, onSelect = Function.prototype, children, ...other }) => {
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
    <CompPopoverOld key={String(data.length)} placement='bottom' {...popoverProps} {...other}>
      {children}
    </CompPopoverOld>
  )
})

export { Popover }
