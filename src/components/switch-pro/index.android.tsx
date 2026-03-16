/*
 * @Author: czy0729
 * @Date: 2023-12-29 22:09:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 04:09:40
 */
import React from 'react'
import { Switch } from 'react-native'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Component } from '../component'
import { COMPONENT } from './ds'

import type { Props as SwitchProProps } from './types'

export type { SwitchProProps }

export function SwitchPro({ style, value, onSyncPress, onAsyncPress }: SwitchProProps) {
  r(COMPONENT)

  return (
    <Component id='component-switch-pro'>
      <Switch
        style={stl(style, {
          transform: [
            {
              scale: 1
            }
          ]
        })}
        value={value}
        onValueChange={onAsyncPress || onSyncPress}
      />
    </Component>
  )
}

export default SwitchPro
