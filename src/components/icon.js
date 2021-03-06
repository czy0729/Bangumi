/*
 * Ionicons Icons
 * @Doc: https://docs.expo.io/versions/latest/guides/icons/
 * @Author: czy0729
 * @Date: 2019-03-15 08:20:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-06 18:11:47
 */
import React from 'react'
import ExpoIcon from '@expo/vector-icons/Ionicons'
import { _ } from '@stores'

function Icon({ style, name, size, color, ...other }) {
  return (
    <ExpoIcon
      style={[_.fontSize(size), style]}
      name={name}
      size={size}
      color={color}
      {...other}
    />
  )
}

Icon.defaultProps = {
  style: undefined,
  name: undefined,
  size: 20,
  color: undefined
}

export default Icon
