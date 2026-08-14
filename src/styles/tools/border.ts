/*
 * @Author: czy0729
 * @Date: 2022-05-25 03:51:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-20 14:14:53
 */
import { StyleSheet } from 'react-native'
import { colorBorder } from '../colors'
import { radiusSm, radiusXs } from '../layout'

/** 边框 (工具类) */
export const border = StyleSheet.create({
  vh: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colorBorder
  },
  top: {
    borderStyle: 'solid',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colorBorder
  }
} as const)

/** 圆角 (工具类) */
export const radius = StyleSheet.create({
  xs: {
    borderRadius: radiusXs,
    overflow: 'hidden'
  },
  sm: {
    borderRadius: radiusSm,
    overflow: 'hidden'
  }
} as const)
