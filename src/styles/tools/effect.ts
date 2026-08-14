/*
 * @Author: czy0729
 * @Date: 2022-05-25 03:51:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-20 14:14:53
 */
import { colorShadow } from '../colors'

/** 阴影 (工具类) */
export const shadow = {
  shadowColor: colorShadow,
  shadowOffset: {
    width: 1,
    height: 4
  },
  shadowOpacity: 0.12,
  shadowRadius: 6,
  elevation: 16
} as const

/** 缩放 (工具类) */
export const scale = {
  transform: [
    {
      scale: 0.64
    }
  ]
} as const

/** 旋转 (工具类) */
export const rotate = {
  transform: [
    {
      rotate: '180deg'
    }
  ]
} as const
