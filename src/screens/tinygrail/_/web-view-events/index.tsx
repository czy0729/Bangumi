/*
 * @Author: czy0729
 * @Date: 2019-09-22 17:36:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-08 22:28:19
 */
import React from 'react'
import { observer } from 'mobx-react'
import { NavigationEvents } from '@components'
import { tinygrailStore } from '@stores'
import { IOS } from '@constants'

function WebViewEvents() {
  if (!IOS) return null

  return (
    <NavigationEvents
      onWillBlur={() => tinygrailStore.updateWebViewShow(false)}
      onWillFocus={() => tinygrailStore.updateWebViewShow(false)}
    />
  )
}

export default observer(WebViewEvents)
