/*
 * @Author: czy0729
 * @Date: 2019-12-14 16:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-14 16:29:32
 */
import React from 'react'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { IOS } from '@constants'
import PopoverIOS from './popover-ios'
import PopoverAndroid from './popover-android'

function Popover(props) {
  if (IOS) {
    return <PopoverIOS {...props} />
  }

  const { iosMenu } = systemStore.setting
  if (iosMenu) {
    return <PopoverIOS {...props} />
  }
  return <PopoverAndroid {...props} />
}

export default observer(Popover)
