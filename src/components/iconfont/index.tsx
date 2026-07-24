/*
 * @Author: czy0729
 * @Date: 2019-05-07 14:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 06:20:07
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
    const shadowStyle = shadow && styles.shadow

    // 公共属性
    const commonProps = {
      size: sizeValue,
      color: color || _.colorIcon,
      ...other
    } as const

    if (name.indexOf('md-') === 0) {
      return (
        <Material
          style={stl(shadowStyle, style)}
          name={name.replace('md-', '') as MaterialIconsNames}
          lineHeight={lineHeightValue}
          {...commonProps}
        />
      )
    }

    if (name.indexOf('ios-') === 0) {
      return (
        <Ionicons
          style={stl(shadowStyle, style)}
          name={name as IoniconsIconsNames}
          lineHeight={lineHeightValue}
          {...commonProps}
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
          shadowStyle,
          style
        )}
        name={(name.includes('icon') ? name : `icon-${name}`) as AppIconsNames}
        {...commonProps}
      />
    )
  }
)

export default Iconfont
