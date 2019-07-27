/*
 * Ionicons Icons
 * @Doc: https://docs.expo.io/versions/latest/guides/icons/
 * @Author: czy0729
 * @Date: 2019-03-15 08:20:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-27 17:08:11
 */
import React from 'react'
import { Icon as ExpoIcon } from 'expo'
// import * as Icon from '@expo/vector-icons' // SDK33

const Icon = ({ style, name, size, color, ...other }) => (
  <ExpoIcon.Ionicons
    style={[
      {
        height: size,
        lineHeight: size
      },
      style
    ]}
    name={name}
    size={size}
    color={color}
    {...other}
  />
)

Icon.defaultProps = {
  style: undefined,
  name: undefined,
  size: 20,
  color: undefined
}

export default Icon
