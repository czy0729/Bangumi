/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:40:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-05 09:27:24
 */
import type { PropsWithChildren } from 'react'
import type { TextStyle } from '@types'

export type Props = PropsWithChildren<{
  /** 图标当成文字一样使用 */
  style?: TextStyle

  /** 表情索引 */
  index?: string | number

  /** 大小 */
  size?: number

  /** 行高 */
  lineHeight?: number

  /** 是否能被文字选中 */
  selectable?: boolean
}>
