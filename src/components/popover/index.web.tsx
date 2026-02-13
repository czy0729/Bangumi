/*
 * @Author: czy0729
 * @Date: 2023-05-26 08:51:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:54:33
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { r } from '@utils/dev'
import PopoverComp from './popover'
import { COMPONENT } from './ds'

export function Popover(props) {
  r(COMPONENT)

  return useObserver(() => <PopoverComp {...props} />)
}

export default Popover
