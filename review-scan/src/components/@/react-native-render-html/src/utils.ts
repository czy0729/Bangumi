/*
 * @Author: czy0729
 * @Date: 2023-04-20 11:12:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 11:15:20
 */
import { AnyObject } from '@types'

/** 避免字号和行号一样导致显示挤压 */
export function optimizeCmputeTextStyles(styles: AnyObject) {
  if (styles?.fontSize && styles?.lineHeight && styles.fontSize === styles.lineHeight) {
    styles.lineHeight = Math.floor(styles.fontSize * 1.5)
  }
  return styles
}
