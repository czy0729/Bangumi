/*
 * Iconfont 自定义图标
 * @Author: czy0729
 * @Date: 2019-05-07 14:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-11 09:59:20
 */
import React from 'react'
import { observer } from 'mobx-react'
import Icons from '@components/@/vector-icons/AntDesign'
import { _ } from '@stores'
import { PAD } from '@constants'
import { Ionicons } from './ionicons'
import { Material } from './material'
import { Props, MaterialIconsNames, IoniconsIconsNames, AppIconsNames } from './types'

const PAD_INCREASE = PAD === 2 ? 4 : 2

export const Iconfont = observer(
  ({ style, name = '', size = 22, lineHeight, color, ...other }: Props) => {
    const _size = size + _.fontSizeAdjust + _.device(0, PAD_INCREASE)
    const _lineHeight = lineHeight + _.fontSizeAdjust

    if (name.indexOf('md-') === 0) {
      return (
        <Material
          style={style}
          name={name.replace('md-', '') as MaterialIconsNames}
          size={_size}
          lineHeight={_lineHeight}
          color={color}
          {...other}
        />
      )
    }

    if (name.indexOf('ios-') === 0) {
      return (
        <Ionicons
          style={style}
          name={name as IoniconsIconsNames}
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
        name={`icon-${name}` as AppIconsNames}
        size={_size}
        color={color || _.colorIcon}
        {...other}
      />
    )
  }
)
