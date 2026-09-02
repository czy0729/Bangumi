/*
 * @Author: czy0729
 * @Date: 2024-01-14 15:32:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:55:43
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { MaskColors } from './types'

export const COMPONENT = rc(PARENT, 'Mask')

/** 亮色模式遮罩渐变色 [顶, 中, 底] */
export const GRADIENT_LIGHT: MaskColors = [
  `rgba(36, 36, 36, 0)`,
  `rgba(36, 36, 36, 0.5)`,
  `rgba(36, 36, 36, 1)`
]

/** 暗色模式遮罩渐变色 [顶, 中, 底] */
export const GRADIENT_DARK: MaskColors = [
  `rgba(0, 0, 0, 0)`,
  `rgba(0, 0, 0, 0.5)`,
  `rgba(0, 0, 0, 1)`
]
