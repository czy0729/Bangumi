/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:40:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 00:07:17
 */
import type { PropsWithChildren } from 'react'
import type { TextProps } from '../text'

export type Props = PropsWithChildren<{
  /** 图标当成文字一样使用 */
  style?: TextProps['style']

  /** 表情索引 */
  index?: string | number

  /** 大小 */
  size?: TextProps['size']

  /** 行高 */
  lineHeight?: TextProps['lineHeight']

  /** 是否能被文字选中 */
  selectable?: TextProps['selectable']
}>
