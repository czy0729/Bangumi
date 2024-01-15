/*
 * @Author: czy0729
 * @Date: 2024-01-14 16:39:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:42:29
 */
import { Override, TextStyle } from '@types'
import { TextProps } from '../text'

export type KatakanaProps = TextProps

export type KatakanaProviderProps = Override<
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
