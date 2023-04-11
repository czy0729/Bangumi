/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Author: czy0729
 * @Date: 2023-04-11 11:12:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 11:13:18
 */
import React from 'react'
import { PopoverProps, Menu, Touchable } from '@components'
import { Popover as CompPopoverOld } from '@components/popover/old'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'

const Popover = ob(
  ({ data = [], menuStyle, onSelect = () => {}, children, ...other }: PopoverProps) => {
    return <Touchable {...other}>{children}</Touchable>
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
