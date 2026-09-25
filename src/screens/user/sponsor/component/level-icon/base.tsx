/*
 * @Author: czy0729
 * @Date: 2023-01-07 21:53:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-07 21:53:19
 */
import Svg from 'react-native-svg'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'

import type { ReactNode } from 'react'
import type { IconProps } from './types'

/**
 * 支持者等级图标基座
 *  - 与 setting/component/icons 同风格: 24 viewBox、round linecap/linejoin
 *  - 图元自行决定 fill / stroke, 基座只提供样板头
 * */
export const IconBase = observer(function IconBase({
  size = 20,
  color = _.colorSub,
  stroke = color,
  strokeWidth = 1.75,
  style,
  children
}: IconProps & { children: ReactNode }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      style={stl(style)}
    >
      {children}
    </Svg>
  )
})
