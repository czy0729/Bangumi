/*
 * @Author: czy0729
 * @Date: 2019-12-13 11:22:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-07 13:10:25
 */
import React from 'react'
import { Switch as RNSwitch } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { ColorValue, ViewStyle, Fn } from '@types'

type Props = {
  style?: ViewStyle
  checked?: boolean
  disabled?: boolean
  color?: ColorValue
  onChange?: Fn
}

export const Switch = observer(
  ({
    style,
    checked = false,
    disabled = false,
    color = _.colorBorder,
    onChange = () => {}
  }: Props) => (
    <RNSwitch
      style={style}
      value={checked}
      disabled={disabled}
      // trackColor={{
      //   false: color,
      //   true: color
      // }}
      ios_backgroundColor={color}
      onValueChange={onChange}
    />
  )
)
