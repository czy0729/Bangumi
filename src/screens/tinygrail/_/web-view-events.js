/*
 * @Author: czy0729
 * @Date: 2019-09-22 17:36:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-22 17:40:54
 */
import React from 'react'
import { NavigationEvents } from 'react-navigation'
import { observer } from '@utils/decorators'
import { IOS } from '@constants'
import { tinygrailStore } from '@stores'

function WebViewEvents() {
  if (!IOS) {
    return null
  }

  return (
    <NavigationEvents
      onWillBlur={() => tinygrailStore.updateWebViewShow(false)}
      onWillFocus={() => tinygrailStore.updateWebViewShow(false)}
    />
  )
}

export default observer(WebViewEvents)
