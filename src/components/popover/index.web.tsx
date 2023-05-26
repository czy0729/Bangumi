/*
 * @Author: czy0729
 * @Date: 2023-05-26 08:51:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-26 09:19:45
 */
import React from 'react'
import { observer } from 'mobx-react'
import PopoverComp from './popover.web'

export const Popover = observer(props => {
  return <PopoverComp {...props} />
})
