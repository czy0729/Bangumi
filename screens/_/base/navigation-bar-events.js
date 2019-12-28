/*
 * @Author: czy0729
 * @Date: 2019-12-10 22:47:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-11 00:16:56
 */
import React from 'react'
import { NavigationEvents } from 'react-navigation'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { IOS } from '@constants'

function NavigationBarEvents({ tinygrail }) {
  if (IOS) {
    return null
  }
  return (
    <NavigationEvents
      onWillFocus={() => {
        try {
          if (tinygrail) {
            changeNavigationBarColor(_.colorTinygrailContainerHex, false)
          } else {
            _.changeNavigationBarColor()
          }
        } catch (error) {
          console.warn('[NavigationBarEvents] onWillFocus', error)
        }
      }}
    />
  )
}

export default observer(NavigationBarEvents)
