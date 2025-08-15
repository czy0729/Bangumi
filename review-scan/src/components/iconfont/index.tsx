/*
 * @Author: czy0729
 * @Date: 2019-05-07 14:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 14:14:19
 */
import React from 'react'
import { observer } from 'mobx-react'
import Icons from '@components/@/vector-icons/AntDesign'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Ionicons } from './ionicons'
import { Material } from './material'
import { COMPONENT, PAD_INCREASE } from './ds'
import {
  AppIconsNames,
  IoniconsIconsNames,
  MaterialIconsNames,
  Props as IconfontProps
} from './types'

// 请勿导出
// export { IconfontProps }

/** Iconfont 自定义项目图标 */
export const Iconfont = observer(
  ({ style, name = '', size = 22, lineHeight, color, ...other }: IconfontProps) => {
    r(COMPONENT)

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
        style={stl(
          {
            height: _size,
            lineHeight: lineHeight ? _lineHeight : _size
          },
          style
        )}
        name={(name.includes('icon') ? name : `icon-${name}`) as AppIconsNames}
        size={_size}
        color={color || _.colorIcon}
        {...other}
      />
    )
  }
)

export default Iconfont
