/*
 * @Author: czy0729
 * @Date: 2019-12-10 22:47:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:49:01
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, NavigationEvents } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { IOS } from '@constants'
import { COMPONENT } from './ds'

import type { Props as NavigationBarEventsProps } from './types'
export type { NavigationBarEventsProps }

/** @deprecated */
export const NavigationBarEvents = observer(({ tinygrail }: NavigationBarEventsProps) => {
  r(COMPONENT)

  if (IOS) return null

  return (
    <Component id='base-navigation-bar-events'>
      <NavigationEvents
        onWillFocus={() => {
          try {
            if (tinygrail) {
              _.changeNavigationBarColorTinygrail()
            } else {
              _.changeNavigationBarColor()
            }
          } catch (error) {}
        }}
      />
    </Component>
  )
})
