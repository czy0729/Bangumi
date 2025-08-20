/*
 * @Author: czy0729
 * @Date: 2023-04-20 11:12:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-21 05:21:36
 */
import { TextProps } from 'react-native'
import { syncSpacing } from '@utils/async'
import { AnyObject } from '@types'

/** 避免字号和行号一样导致显示挤压 */
export function optimizeCmputeTextStyles(styles: AnyObject) {
  if (styles?.fontSize && styles?.lineHeight && styles.fontSize >= styles.lineHeight) {
    styles.lineHeight = Math.floor(styles.fontSize * 1.5)
  }
  return styles
}

/** 文字递归盘古文案排版转换 */
export function formatSpacing(children: TextProps['children']) {
  if (typeof children === 'string') return syncSpacing(children)

  if (Array.isArray(children)) return children.map(item => formatSpacing(item))

  return children
}
