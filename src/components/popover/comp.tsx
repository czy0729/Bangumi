/*
 * @Author: czy0729
 * @Date: 2019-06-01 18:25:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 12:31:14
 */
import React from 'react'
import { IOS } from '@constants'
import { Menu } from '../menu'
import { Popover as PopoverComp } from './index'
import { Props } from './types'

export const Popover = ({ data = [], onSelect = () => {}, children, ...other }: Props) => {
  const popoverProps = IOS
    ? {
        overlay: <Menu data={data} onSelect={title => setTimeout(() => onSelect(title), 0)} />
      }
    : {
        data,
        onSelect
      }
  return (
    <PopoverComp placement='bottom' {...popoverProps} {...other}>
      {children}
    </PopoverComp>
  )
}
