/*
 * Ionicons Icons
 * @Doc: https://docs.expo.io/versions/latest/guides/icons/
 * @Author: czy0729
 * @Date: 2019-03-15 08:20:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-09 11:18:57
 */
import React from 'react'
import { observer } from 'mobx-react'
import ExpoIcon from '@expo/vector-icons/Ionicons'
import { _ } from '@stores'

export const Icon = observer(({ style, name, size = 20, color, ...other }) => (
  <ExpoIcon
    style={[_.fontSize(size), style]}
    name={name}
    size={size}
    color={color}
    {...other}
  />
))
