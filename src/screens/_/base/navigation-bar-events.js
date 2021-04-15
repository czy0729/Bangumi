/*
 * @Author: czy0729
 * @Date: 2019-12-10 22:47:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-15 16:02:40
 */
import React from 'react'
import { NavigationEvents } from 'react-navigation'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'

export const NavigationBarEvents = ob(({ tinygrail }) => {
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
})
