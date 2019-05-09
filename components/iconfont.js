/*
 * @Author: czy0729
 * @Date: 2019-05-07 14:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-09 02:57:58
 */
import React from 'react'
import { Icon } from 'expo'
import { colorIcon } from '@styles'

const Iconfont = ({ style, name, size, color, ...other }) => (
  <Icon.Iconfont
    style={[
      {
        height: size,
        lineHeight: size
      },
      style
    ]}
    name={`icon-${name}`}
    size={size}
    color={color}
    {...other}
  />
)

Iconfont.defaultProps = {
  style: undefined,
  name: undefined,
  size: 20,
  color: colorIcon
}

export default Iconfont
