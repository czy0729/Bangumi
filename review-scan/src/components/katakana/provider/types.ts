/*
 * @Author: czy0729
 * @Date: 2024-01-14 16:39:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-18 20:11:00
 */
import { Override, TextStyle } from '@types'
import { TextProps } from '../../text'

export type Props = Override<
  TextProps,
  {
    /** 所有katakana的样式 */
    itemStyle?: TextStyle

    /** 非第一行katakana的样式 */
    itemSecondStyle?: TextStyle

    /** props可强制启动 */
    active?: boolean
  }
>

export type Mathces = {
  jp: string
  en: string
  top?: number
  left?: number
  width?: number
  type?: TextProps['type']
  bold?: TextProps['bold']
  align?: 'center' | 'left'
}

export type State = {
  fullTextConfig: {
    text: string
    size: TextProps['size']
    lineHeight: TextProps['lineHeight']
    bold: TextProps['bold']
    type: TextProps['type']
  }[]
  matches: Mathces[]
  rootWidth: number
}
