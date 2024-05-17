/*
 * @Author: czy0729
 * @Date: 2022-05-02 11:29:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-18 05:04:47
 */
import React from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import PopoverIOS from './popover'
import { COMPONENT } from './ds'
import { Props as PopoverProps } from './types'

export { PopoverProps }

/** 点击位置弹出层 */
function PopoverComp<ItemT extends string[] | readonly string[]>({
  data,
  onSelect,
  children,
  ...other
}: PopoverProps<ItemT>) {
  r(COMPONENT)

  return (
    <PopoverIOS {...other} data={data} onSelect={onSelect}>
      {children}
    </PopoverIOS>
  )
}

/** 点击位置弹出层 */
export const Popover = observer(PopoverComp)
