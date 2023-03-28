/*
 * @Author: czy0729
 * @Date: 2019-06-01 18:25:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 04:41:35
 */
import React from 'react'
import { IOS } from '@constants'
import { Menu } from '../menu'
import { Popover as CompPopover } from './index'
import { Props } from './types'

export const Popover = ({
  data = [],
  onSelect = () => {},
  children,
  ...other
}: Props) => {
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
