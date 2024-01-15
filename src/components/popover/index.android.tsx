/*
 * @Author: czy0729
 * @Date: 2019-12-14 16:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:13:37
 */
import React from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import PopoverAndroid from './popover'
import { COMPONENT } from './ds'

export const Popover = observer(props => {
  r(COMPONENT)

  return <PopoverAndroid {...props} />
})
