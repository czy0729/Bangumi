/*
 * @Author: czy0729
 * @Date: 2019-06-01 18:25:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-03 12:08:09
 */
import React from 'react'
import { Popover as CompPopover, Menu } from '@components'
import { IOS } from '@constants'

function Popover({ data, onSelect, children, ...other }) {
  const popoverProps = IOS
    ? {
        overlay: (
          <Menu
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
