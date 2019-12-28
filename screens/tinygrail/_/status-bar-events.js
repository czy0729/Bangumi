/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:42:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-10 23:21:53
 */
import React from 'react'
import { observer } from 'mobx-react'
import { StatusBarEvents as CompStatusBarEvents } from '@components'
import { NavigationBarEvents } from '@screens/_'
import { _ } from '@stores'
import WebViewEvents from './web-view-events'

function StatusBarEvents() {
  return (
    <>
      <NavigationBarEvents tinygrail />
      <WebViewEvents />
      <CompStatusBarEvents
        barStyle='light-content'
        backgroundColor={_.colorTinygrailContainer}
      />
    </>
  )
}

export default observer(StatusBarEvents)
