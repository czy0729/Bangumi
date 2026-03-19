/*
 * @Author: czy0729
 * @Date: 2023-05-26 08:51:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 02:58:10
 */
import React from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import PopoverComp from './popover'
import { COMPONENT } from './ds'

import type { PopoverData, Props as PopoverProps } from './types'
export type { PopoverProps, PopoverData }

export const Popover = observer(props => {
  r(COMPONENT)

  return <PopoverComp {...props} />
})

export default Popover
