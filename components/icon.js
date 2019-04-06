/*
 * @Author: czy0729
 * @Date: 2019-03-15 08:20:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-07 03:26:47
 */
import React from 'react'
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
