/*
 * @Author: czy0729
 * @Date: 2019-11-26 20:10:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-21 19:32:17
 */
import React from 'react'
import { NativeModules } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { IOS } from '@constants'

const UMAnalyticsModule = NativeModules.UMAnalyticsModule

function UM({ screen }) {
  if (IOS || !screen) {
    return null
  }

  return (
    <NavigationEvents
      onDidFocus={() => UMAnalyticsModule.onPageStart(screen)}
      onWillBlur={() => UMAnalyticsModule.onPageEnd(screen)}
    />
  )
}

UM.defaultProps = {
  screen: ''
}

export default UM
