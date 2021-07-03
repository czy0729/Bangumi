/*
 * Iconfont 自定义图标
 * @Author: czy0729
 * @Date: 2019-05-07 14:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-03 13:47:56
 */
import React from 'react'
import { observer } from 'mobx-react'
import Icons from '@expo/vector-icons/AntDesign'
import { _ } from '@stores'
import { Icon } from './icon'
import { MD } from './md'

export const Iconfont = observer(
  ({ style, name, size = 22, lineHeight, color, ...other }) => {
    if (name.indexOf('md-') === 0) {
      return (
        <MD
          style={style}
          name={name.replace('md-', '')}
          size={size + _.fontSizeAdjust}
          lineHeight={lineHeight + _.fontSizeAdjust}
          color={color}
          {...other}
        />
      )
    }

    if (name.indexOf('ios-') === 0) {
      return (
        <Icon
          style={style}
          name={name}
          size={size + _.fontSizeAdjust}
          lineHeight={lineHeight + _.fontSizeAdjust}
          color={color}
          {...other}
        />
      )
    }

    return (
      <Icons
        style={[
          {
            height: size + _.fontSizeAdjust,
            lineHeight: (lineHeight || size) + _.fontSizeAdjust
          },
          style
        ]}
        name={`icon-${name}`}
        size={size + _.fontSizeAdjust}
        color={color || _.colorIcon}
        {...other}
      />
    )
  }
)
