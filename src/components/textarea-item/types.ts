/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import type { TextInputProps } from 'react-native'

export type Props = {
  /** 是否随内容自动增高 */
  autoHeight?: boolean

  /** 是否显示 iOS 清空按钮, 默认 true */
  clear?: boolean

  /** 最大字符数, 大于 0 时展示计数 */
  count?: number

  /** 是否错误态 (文字变红右留白) */
  error?: boolean

  /** 输入变化回调 */
  onChange?: (text: string) => void

  /** 行数, 默认 1 */
  rows?: number

  /** 容器样式 */
  style?: object
} & Omit<TextInputProps, 'onChange'>