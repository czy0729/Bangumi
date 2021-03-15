/*
 * Iconfont 自定义图标
 * @Author: czy0729
 * @Date: 2019-05-07 14:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-15 11:36:29
 */
import React from 'react'
import { observer } from 'mobx-react'
import Icons from '@expo/vector-icons/AntDesign'
import { _ } from '@stores'
import { Icon } from './icon'

export const Iconfont = observer(
  ({ style, name, size = 20, lineHeight, color, ...other }) =>
    name.includes('ios-') ? (
      <Icon
        style={style}
        name={name}
        size={size}
        lineHeight={lineHeight}
        color={color}
        {...other}
      />
    ) : (
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
        {...other}
      />
    )
)
