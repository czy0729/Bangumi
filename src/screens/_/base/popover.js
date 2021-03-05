/*
 * @Author: czy0729
 * @Date: 2019-06-01 18:25:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-05 11:42:20
 */
import React from 'react'
import { Popover as CompPopover, Menu } from '@components'
import { IOS } from '@constants'

function Popover({ data, menuStyle, onSelect, children, ...other }) {
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

Popover.defaultProps = {
  data: [],
  onSelect: Function.prototype
}

export default Popover
