/*
 * @Author: czy0729
 * @Date: 2023-12-29 22:09:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 04:02:53
 */
import React from 'react'
import { Switch } from 'react-native'
import { r } from '@utils/dev'
import { Component } from '../component'
import { COMPONENT } from './ds'

export function SwitchPro({ style, value, onSyncPress, onAsyncPress }) {
  r(COMPONENT)

  return (
    <Component id='component-switch-pro'>
      <Switch
        style={[
          style,
          {
            transform: [
              {
                scale: 1
              }
            ]
          }
        ]}
        value={value}
        onValueChange={onAsyncPress || onSyncPress}
      />
    </Component>
  )
}

export default SwitchPro
