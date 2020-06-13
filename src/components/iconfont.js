/*
 * Iconfont 自定义图标
 * @Author: czy0729
 * @Date: 2019-05-07 14:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-13 15:06:35
 */
import React from 'react'
import { observer } from 'mobx-react'
import * as Icon from '@expo/vector-icons'
import { _ } from '@stores'

function Iconfont({ style, name, size, lineHeight, color, ...other }) {
  return (
    <Icon.AntDesign
      style={[
        {
          height: size,
          lineHeight: lineHeight || size
        },
        style
      ]}
      name={`icon-${name}`}
      size={size}
      color={color || _.colorIcon}
      borderRadius={0}
      {...other}
    />
  )
}

Iconfont.defaultProps = {
  style: undefined,
  name: undefined,
  size: 20
}

export default observer(Iconfont)
