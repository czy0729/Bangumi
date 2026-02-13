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

import type { PopoverData, Props } from './types'

export function Popover<Data extends PopoverData>({
  data,
  onSelect = FROZEN_FN,
  children,
  ...other
}: Props<Data>) {
  const popoverProps = IOS
    ? {
        overlay: (
          <Menu
            data={data || ([] as any)}
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
        data: data || ([] as any),
        onSelect
      }

  return (
    <PopoverComp placement='bottom' {...popoverProps} {...other}>
      {children}
    </PopoverComp>
  )
}
