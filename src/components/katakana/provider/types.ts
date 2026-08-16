/*
 * @Author: czy0729
 * @Date: 2024-01-14 16:39:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-15 06:14:28
 */
import type { Override, TextStyle, ViewStyle } from '@types'
import type { TextProps } from '../../text'

export type Props = Override<
  TextProps,
  {
    /** 容器样式: 罗马音仅出现在首行时生效 */
    firstLineStyle?: ViewStyle

    /** 罗马音通用样式 */
    itemStyle?: TextStyle

    /** 非首行罗马音的样式 */
    itemSecondStyle?: TextStyle

    /** 是否强制开启该功能 */
    active?: boolean
  }
>

export type Matches = {
  /** 片假名原文 */
  jp: string

  /** 翻译后的罗马音/英文 */
  en: string

  /** 所在行索引 */
  lineIndex?: number

  /** 所在行行顶 y 坐标 */
  top?: number

  /** 单词在可见文本内是否不完整 (剩余部分被 numberOfLines 截断) */
  truncated?: boolean

  /** 所在行是否为 numberOfLines 截断的最后可见行 (该行之后的行均不可见) */
  lastLine?: boolean

  /** 行内偏移比例换算出的水平位置 */
  left?: number

  /** 按字符占比换算出的宽度 */
  width?: number

  /** 所在行宽度 */
  lineWidth?: number

  /** 罗马音文字类型 */
  type?: TextProps['type']

  /** 罗马音是否加粗 */
  bold?: TextProps['bold']
}
