/*
 * @Author: czy0729
 * @Date: 2019-03-15 08:20:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-19 21:24:27
 */
import React from 'react'
// import * as Icon from '@expo/vector-icons'
import { Icon } from 'expo'

const _Icon = ({ style, name, size, color, ...other }) => (
  <Icon.Ionicons
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

_Icon.defaultProps = {
  style: undefined,
  name: undefined,
  size: 20,
  color: undefined
}

export default _Icon
