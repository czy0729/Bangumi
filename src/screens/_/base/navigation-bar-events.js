/*
 * @Author: czy0729
 * @Date: 2019-12-10 22:47:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-11 11:46:59
 */
import React from 'react'
import { NavigationEvents } from 'react-navigation'
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
            _.changeNavigationBarColorTinygrail()
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
