/*
 * @Author: czy0729
 * @Date: 2019-12-14 16:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 02:57:42
 */
import React from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import PopoverAndroid from './popover'
import { COMPONENT } from './ds'

import type { PopoverData, Props as PopoverProps } from './types'
export type { PopoverProps, PopoverData }

export const Popover = observer(props => {
  r(COMPONENT)

  return <PopoverAndroid {...props} />
})

export default Popover
