/*
 * @Author: czy0729
 * @Date: 2024-06-13 22:34:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-03 06:38:54
 */
import React from 'react'
import { Text } from '@components'

import type { Props as VerticalAlignProps } from './types'
export type { VerticalAlignProps }

/**
 * 对于安卓端某些特殊字符, 存在超过行高的高度会看不全,
 * 自动改变行高然后垂直居中尽量显示, 仅安卓需要
 * */
export const VerticalAlign = ({ text, onHit, children, ...other }: VerticalAlignProps) => {
  return <Text {...other}>{children}</Text>
}

export default VerticalAlign
