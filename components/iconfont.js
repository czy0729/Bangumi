/*
 * Iconfont 自定义图标
 * @Author: czy0729
 * @Date: 2019-05-07 14:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-20 20:19:22
 */
import React from 'react'
import * as Icon from '@expo/vector-icons'
import { colorIcon } from '@styles'

const Iconfont = ({ style, name, size, color, ...other }) => (
  <Icon.AntDesign
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
