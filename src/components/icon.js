/*
 * Ionicons Icons
 * @Doc: https://docs.expo.io/versions/latest/guides/icons/
 * @Author: czy0729
 * @Date: 2019-03-15 08:20:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-05 20:30:19
 */
import React from 'react'
import ExpoIcon from '@expo/vector-icons/Ionicons'

function Icon({ style, name, size, color, ...other }) {
  return (
    <ExpoIcon
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
}

Icon.defaultProps = {
  style: undefined,
  name: undefined,
  size: 20,
  color: undefined
}

export default Icon
