/*
 * Iconfont 自定义图标
 * @Author: czy0729
 * @Date: 2019-05-07 14:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-30 14:14:36
 */
import React from 'react'
import * as Icon from '@expo/vector-icons'
import _ from '@styles'

function Iconfont({ style, name, size, color, ...other }) {
  return (
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
}

Iconfont.defaultProps = {
  style: undefined,
  name: undefined,
  size: 20,
  color: _.colorIcon
}

export default Iconfont
