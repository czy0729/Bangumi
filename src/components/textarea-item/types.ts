/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import type {
  NativeSyntheticEvent,
  TextInputContentSizeChangeEvent,
  TextInputProps
} from 'react-native'
import type { TextStyle } from '@types'

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

  /** 文本域样式 */
  style?: TextStyle
} & Omit<TextInputProps, 'onChange'>

/** 文本输入内容变化事件 */
export type TextareaChangeEvent = NativeSyntheticEvent<{ text: string }>

/** useTextareaItem 选项 */
export type UseTextareaItemOptions = {
  /** 受控值 */
  value?: string

  /** 是否随内容自动增高 */
  autoHeight?: boolean

  /** 固定高度 (按行数估算) */
  itemHeight: number

  /** 输入变化回调 */
  onChange?: (text: string) => void

  /** 内容尺寸变化回调 */
  onContentSizeChange?: (e: TextInputContentSizeChangeEvent) => void
}
