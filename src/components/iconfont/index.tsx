/*
 * @Author: czy0729
 * @Date: 2019-05-07 14:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 19:03:01
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Icons } from '@components/@'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import Ionicons from './ionicons'
import Material from './material'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type {
  AppIconsNames,
  IoniconsIconsNames,
  MaterialIconsNames,
  Props as IconfontProps
} from './types'

// 请勿导出
// export type { IconfontProps }

/** 自定义项目图标 */
export const Iconfont = observer(
  ({ style, name = '', size = 22, lineHeight, color, shadow, ...other }: IconfontProps) => {
    r(COMPONENT)

    const sizeValue = size + _.fontSizeAdjust + _.device(0, _.padIncrease)
    const lineHeightValue = lineHeight + _.fontSizeAdjust

    if (name.indexOf('md-') === 0) {
      return (
        <Material
          style={stl(shadow && styles.shadow, style)}
          name={name.replace('md-', '') as MaterialIconsNames}
          size={sizeValue}
          lineHeight={lineHeightValue}
          color={color}
          {...other}
        />
      )
    }

    if (name.indexOf('ios-') === 0) {
      return (
        <Ionicons
          style={stl(shadow && styles.shadow, style)}
          name={name as IoniconsIconsNames}
          size={sizeValue}
          lineHeight={lineHeightValue}
          color={color}
          {...other}
        />
      )
    }

    return (
      <Icons
        style={stl(
          {
            height: sizeValue,
            lineHeight: lineHeight ? lineHeightValue : sizeValue
          },
          shadow && styles.shadow,
          style
        )}
        name={(name.includes('icon') ? name : `icon-${name}`) as AppIconsNames}
        size={sizeValue}
        color={color || _.colorIcon}
        {...other}
      />
    )
  }
)

export default Iconfont
