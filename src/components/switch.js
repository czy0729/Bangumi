/*
 * @Author: czy0729
 * @Date: 2019-12-13 11:22:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-09 11:51:12
 */
import React from 'react'
import { Switch as RNSwitch } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'

export const Switch = observer(
  ({
    style,
    checked = false,
    disabled = false,
    color = _.colorBorder,
    onChange = Function.prototype
  }) => (
    <RNSwitch
      style={style}
      value={checked}
      disabled={disabled}
      trackColor={color}
      ios_backgroundColor={color}
      onValueChange={onChange}
    />
  )
)
