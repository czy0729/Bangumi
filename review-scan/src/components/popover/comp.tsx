/*
 * @Author: czy0729
 * @Date: 2019-06-01 18:25:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:54:42
 */
import React from 'react'
import { FROZEN_FN, IOS } from '@constants'
import { Menu } from '../menu'
import { Popover as PopoverComp } from './index'
import { PopoverData, Props } from './types'

export const Popover = <Data extends PopoverData>({
  data,
  onSelect = FROZEN_FN,
  children,
  ...other
}: Props<Data>) => {
  const popoverProps = IOS
    ? {
        overlay: (
          <Menu
            data={data || []}
            onSelect={(title, index, evt) => {
              setTimeout(() => {
                onSelect(title, index, evt)
              }, 0)
            }}
          />
        )
      }
    : {
        ...other,
        data: data || [],
        onSelect
      }

  return (
    <PopoverComp placement='bottom' {...popoverProps} {...other}>
      {children}
    </PopoverComp>
  )
}
