/*
 * @Author: czy0729
 * @Date: 2019-11-26 20:10:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-07 15:04:58
 */
import React from 'react'
import { NativeModules } from 'react-native'
// import { NavigationEvents } from 'react-navigation'
import { IOS } from '@constants'
import { NavigationEvents } from './navigation-events'

const { UMAnalyticsModule } = NativeModules

export const UM = ({ screen = '' }) => {
  if (IOS || !screen) return null

  return (
    <NavigationEvents
      onDidFocus={() => {
        setTimeout(() => UMAnalyticsModule.onPageStart(screen), 0)
      }}
      onWillBlur={() => UMAnalyticsModule.onPageEnd(screen)}
    />
  )
}
