/*
 * @Author: czy0729
 * @Date: 2019-06-01 18:25:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-15 20:55:03
 */
import React from 'react'
import { Popover as CompPopover, Menu } from '@components'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'

export const Popover = ob(
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
      <CompPopover placement='bottom' {...popoverProps} {...other}>
        {children}
      </CompPopover>
    )
  }
)
