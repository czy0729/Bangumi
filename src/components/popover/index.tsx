/*
 * @Author: czy0729
 * @Date: 2022-05-02 11:29:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-21 12:53:48
 */
import React from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import PopoverIOS from './popover'
import { COMPONENT } from './ds'
import { PopoverData, Props as PopoverProps } from './types'

export { PopoverProps, PopoverData }

/** 点击位置弹出层 */
function PopoverComp<Data extends PopoverData>({
  data,
  onSelect,
  children,
  ...other
}: PopoverProps<Data>) {
  r(COMPONENT)

  return (
    <PopoverIOS {...other} data={data} onSelect={onSelect}>
      {children}
    </PopoverIOS>
  )
}

/** 点击位置弹出层 */
export const Popover = observer(PopoverComp)

export default Popover
