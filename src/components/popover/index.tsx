/*
 * @Author: czy0729
 * @Date: 2022-05-02 11:29:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-09 17:59:31
 */
import React from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import PopoverIOS from './popover'
import { COMPONENT } from './ds'

import type { PopoverData, Props as PopoverProps } from './types'

export type { PopoverProps, PopoverData }

/** 点击位置弹出层 */
function PopoverComp<Data extends PopoverData>({
  data,
  activateOn,
  onSelect,
  children,
  ...other
}: PopoverProps<Data>) {
  r(COMPONENT)

  return (
    <PopoverIOS {...other} data={data} activateOn={activateOn} onSelect={onSelect}>
      {children}
    </PopoverIOS>
  )
}

/** 点击位置弹出层 */
export const Popover = observer(PopoverComp)

export default Popover
