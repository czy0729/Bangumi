/*
 * @Author: czy0729
 * @Date: 2023-12-29 22:09:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-29 22:18:48
 */
import React from 'react'
import { Switch } from 'react-native'
import { Component } from '../component'

export function SwitchPro({ style, value, onSyncPress, onAsyncPress }) {
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
