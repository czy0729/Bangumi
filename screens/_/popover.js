/*
 * @Author: czy0729
 * @Date: 2019-06-01 18:25:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-01 18:25:54
 */
import React from 'react'
import { Popover as CompPopover, Menu } from '@components'
import { IOS } from '@constants'

const Popover = ({ data, onSelect, children, ...other }) => {
  const popoverProps = IOS
    ? {
        overlay: <Menu data={data} onSelect={onSelect} />
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
