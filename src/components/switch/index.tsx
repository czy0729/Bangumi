/*
 * @Author: czy0729
 * @Date: 2019-12-13 11:22:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:38:57
 */
import React from 'react'
import { Switch as RNSwitch } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { Props as SwitchProps } from './types'

export { SwitchProps }

/** @deprecated 开关 */
export const Switch = observer(
  ({
    style,
    checked = false,
    disabled = false,
    color = _.colorBorder,
    onChange = () => {}
  }: SwitchProps) => {
    r(COMPONENT)

    return (
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
  }
)
