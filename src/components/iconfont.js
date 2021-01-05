/*
 * Iconfont 自定义图标
 * @Author: czy0729
 * @Date: 2019-05-07 14:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-05 17:22:18
 */
import React from 'react'
import { observer } from 'mobx-react'
import Icons from '@expo/vector-icons/AntDesign'
import { _ } from '@stores'

function Iconfont({ style, name, size, lineHeight, color, ...other }) {
  return (
    <Icons
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
