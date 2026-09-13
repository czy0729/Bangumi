/*
 * @Author: czy0729
 * @Date: 2026-09-13 21:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 22:20:00
 */
import React from 'react'
import Svg from 'react-native-svg'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'

import type { ReactNode } from 'react'
import type { ViewStyle } from '@types'

/**
 * 设置页手写图标集
 *  - 参考 web/test/umami 的 Lucide 风格: 24 viewBox、fill none、stroke、round linecap/linejoin
 *  - 颜色由基座订阅主题, 主题切换时父级 (行组件) 不需要重渲染
 * */
export interface IconProps {
  /** 图标边长 (px) */
  size?: number

  /**
   * 描边颜色
   *  - 默认 colorSub: 浅色主题是 rgb(128,128,128), 与黑色标题有明显区分
   *  - 不用 colorDesc (浅色下是 rgb(12,12,12), 会和标题糊在一起)
   * */
  color?: string

  /** 描边宽度 */
  strokeWidth?: number

  /** 附加样式 */
  style?: ViewStyle
}

/** 图标基座: 统一 svg 样板头 */
export const IconBase = observer(function IconBase({
  size = 17,
  color = _.colorSub,
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
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      style={stl(style)}
    >
      {children}
    </Svg>
  )
})
