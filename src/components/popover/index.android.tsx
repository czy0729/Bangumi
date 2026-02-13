/*
 * @Author: czy0729
 * @Date: 2019-12-14 16:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:54:26
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { r } from '@utils/dev'
import PopoverAndroid from './popover'
import { COMPONENT } from './ds'

export function Popover(props) {
  r(COMPONENT)

  return useObserver(() => <PopoverAndroid {...props} />)
}

export default Popover
