/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:42:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-22 17:45:21
 */
import React from 'react'
import { StatusBarEvents as CompStatusBarEvents } from '@components'
import { colorContainer } from '../styles'
import WebViewEvents from './web-view-events'

function StatusBarEvents() {
  return (
    <>
      <WebViewEvents />
      <CompStatusBarEvents
        barStyle='light-content'
        backgroundColor={colorContainer}
      />
    </>
  )
}

export default StatusBarEvents
