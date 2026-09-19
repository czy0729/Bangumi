/*
 * @Author: czy0729
 * @Date: 2019-05-07 14:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-20 00:13:02
 */
import { memo, useMemo } from 'react'
import { observer } from 'mobx-react'
import Icons from '@components/@/vector-icons/AntDesign'
import Ionicons from '@components/@/vector-icons/Ionicons'
import Material from '@components/@/vector-icons/MaterialIcons'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { getAppIconName, getIconFamily } from './utils'
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
export const Iconfont = memo(
  observer(function Iconfont({
    style,
    name = '',
    size = 22,
    lineHeight,
    color,
    shadow,
    ...other
  }: IconfontProps) {
    r(COMPONENT)

    const sizeValue = size + _.fontSizeAdjust + _.device(0, _.padIncrease)
    const lineHeightValue = lineHeight + _.fontSizeAdjust

    /** 引用稳定, 未变更时内层 PureComponent 可以跳过重渲染 */
    const iconStyle = useMemo(
      () =>
        stl(
          {
            height: sizeValue,
            lineHeight: lineHeight ? lineHeightValue : sizeValue
          },
          shadow && styles.shadow,
          style
        ),
      [sizeValue, lineHeight, lineHeightValue, shadow, style]
    )

    // 公共属性
    const commonProps = {
      size: sizeValue,
      color: color || _.colorIcon,
      ...other
    } as const

    const family = getIconFamily(name)

    if (family === 'material') {
      return (
        <Material
          style={iconStyle}
          name={name.replace('md-', '') as MaterialIconsNames}
          {...commonProps}
        />
      )
    }

    if (family === 'ionicons') {
      return <Ionicons style={iconStyle} name={name as IoniconsIconsNames} {...commonProps} />
    }

    return <Icons style={iconStyle} name={getAppIconName(name) as AppIconsNames} {...commonProps} />
  })
)

export default Iconfont
