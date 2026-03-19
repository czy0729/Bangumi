/*
 * @Author: czy0729
 * @Date: 2019-12-14 16:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 15:27:46
 */
import React from 'react'
import { observer } from 'mobx-react'
import PopoverAndroid from './popover'

export const Popover = observer(props => {
  return <PopoverAndroid {...props} />
})
