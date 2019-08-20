/*
 * Ionicons Icons
 * @Doc: https://docs.expo.io/versions/latest/guides/icons/
 * @Author: czy0729
 * @Date: 2019-03-15 08:20:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-20 20:19:15
 */
import React from 'react'
import * as ExpoIcon from '@expo/vector-icons'

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
