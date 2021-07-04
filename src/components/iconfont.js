/*
 * Iconfont 自定义图标
 * @Author: czy0729
 * @Date: 2019-05-07 14:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-05 01:20:55
 */
import React from 'react'
import { observer } from 'mobx-react'
import Icons from '@expo/vector-icons/AntDesign'
import { _ } from '@stores'
import { PAD } from '@constants'
import { Icon } from './icon'
import { MD } from './md'

const padIncrease = PAD === 2 ? 4 : 2

export const Iconfont = observer(
  ({ style, name, size = 22, lineHeight, color, ...other }) => {
    const _size = size + _.fontSizeAdjust + (_.isPad ? padIncrease : 0)
    const _lineHeight = lineHeight + _.fontSizeAdjust

    if (name.indexOf('md-') === 0) {
      return (
        <MD
          style={style}
          name={name.replace('md-', '')}
          size={_size}
          lineHeight={_lineHeight}
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
          size={_size}
          lineHeight={_lineHeight}
          color={color}
          {...other}
        />
      )
    }

    return (
      <Icons
        style={[
          {
            height: _size,
            lineHeight: lineHeight ? _lineHeight : _size
          },
          style
        ]}
        name={`icon-${name}`}
        size={_size}
        color={color || _.colorIcon}
        {...other}
      />
    )
  }
)
