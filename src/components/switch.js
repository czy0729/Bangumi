/*
 * @Author: czy0729
 * @Date: 2019-12-13 11:22:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-13 11:49:40
 */
import React from 'react'
import { Switch as RNSwitch } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'

function Switch({ style, checked, disabled, color = _.colorBorder, onChange }) {
  return (
    <RNSwitch
      style={style}
      value={checked}
      disabled={disabled}
      trackColor={color}
      ios_backgroundColor={color}
      onValueChange={onChange}
    />
  )
}

Switch.defaultProps = {
  checked: false,
  disabled: false,
  color: undefined,
  onChange: Function.prototype
}

export default observer(Switch)
