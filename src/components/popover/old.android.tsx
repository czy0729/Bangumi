/*
 * @Author: czy0729
 * @Date: 2019-12-14 16:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-01 21:33:25
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import PopoverAndroid from './popover'

export function Popover(props) {
  return useObserver(() => <PopoverAndroid {...props} />)
}
