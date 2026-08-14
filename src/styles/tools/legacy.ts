/*
 * @Author: czy0729
 * @Date: 2022-05-25 03:51:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-20 14:14:53
 */
import { StyleSheet } from 'react-native'
import { IOS } from '@constants/constants'
import { colorBorder } from '../colors'
import { IS_IOS_5_6_7_8, radiusXs, ratio, sm, statusBarHeight, tabsHeaderHeight } from '../layout'
import { fontSize } from '../utils'

/** @deprecated 垂直缩小 (工具类) */
export const short = {
  minHeight: 'auto',
  marginBottom: -sm
} as const

/** @deprecated */
export const input = StyleSheet.create({
  base: {
    padding: 8,
    width: '100%',
    ...fontSize(14),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorBorder,
    borderRadius: radiusXs
  },
  multi: {
    padding: 8,
    width: '100%',
    ...fontSize(14),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorBorder,
    borderRadius: radiusXs
  }
} as const)

/** @deprecated */
export const header = StyleSheet.create({
  left: {
    position: 'absolute',
    top: IOS ? statusBarHeight + (IS_IOS_5_6_7_8 ? 12 : 8) : statusBarHeight + 12,
    left: 4
  },
  right: {
    position: 'absolute',
    top: IOS ? statusBarHeight + (IS_IOS_5_6_7_8 ? 12 : 8) : statusBarHeight + 12,
    right: 8
  }
} as const)

/** @deprecated */
export const listViewProps = IOS
  ? {
      // contentInset: {
      //   top: tabsHeaderHeight * ratio
      // },
      contentOffset: {
        y: -tabsHeaderHeight * ratio
      }
    }
  : {}

/** 安卓部分机型文字若不至少传递字体, 会出现文字截断现象 */
export const androidTextFixedStyle = {
  fontFamily: ''
} as const
