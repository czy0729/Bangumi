/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:42:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-19 16:36:42
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
      <CompStatusBarEvents
        tinygrail
        barStyle={_.isTinygrailDark ? 'light-content' : 'dark-content'}
        backgroundColor={_.colorTinygrailContainer}
      />
      <WebViewEvents />
      <NavigationBarEvents tinygrail />
    </>
  )
}

export default observer(StatusBarEvents)
