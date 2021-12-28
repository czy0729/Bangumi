/*
 * @Author: czy0729
 * @Date: 2019-06-01 18:25:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-28 22:42:29
 */
import React from 'react'
import { IOS } from '@constants'
import { Menu } from '../menu'
import CompPopover from './index'

export const Popover = ({
  data = [],
  onSelect = Function.prototype,
  children,
  ...other
}) => {
  const popoverProps = IOS
    ? {
        overlay: (
          <Menu data={data} onSelect={title => setTimeout(() => onSelect(title), 0)} />
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
