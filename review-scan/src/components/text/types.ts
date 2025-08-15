/*
 * @Author: czy0729
 * @Date: 2022-06-13 10:52:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-04 17:47:39
 */
import { MutableRefObject } from 'react'
import { Text as RNText, TextProps } from 'react-native'
import { Override, ReactNode, TextStyle } from '@types'

export type TextType =
  | 'plain'
  | '__plain__'
  | 'main'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'title'
  | 'desc'
  | 'sub'
  | 'icon'
  | 'border'
  | 'avatar'
  | 'bid'
  | 'ask'
  | 'tinygrailPlain'
  | 'tinygrailText'
  | 'tinygrailIcon'

export type Props = Override<
  TextProps,
  {
    /** 获取 ref */
    forwardRef?: MutableRefObject<RNText>

    /** 样式 */
    style?: TextStyle

    /** 强制覆盖样式 */
    overrideStyle?: TextStyle

    /** 预设主题色 */
    type?: TextType

    /** 大小 */
    size?: number

    /**
     * 行高
     * 小于等于2的时候为比例，大小*行高=最终行高；大于2的时候为数值=最终行高
     * */
    lineHeight?: number

    /** 额外增加的行高，主要用于<片假名终结者> */
    lineHeightIncrease?: number

    /** 对齐 */
    align?: 'left' | 'center' | 'right'

    /** 是否加粗 */
    bold?: boolean

    /** 是否下划线 */
    underline?: boolean

    /** 是否带阴影 */
    shadow?: boolean

    /** 允许文本收缩 */
    shrink?: boolean

    /** 是否可选择 */
    selectable?: boolean

    /** 是否不允许换行 (仅在网页端生效) */
    noWrap?: boolean

    /** 是否允许自动转换简繁体 */
    s2t?: boolean

    pointerEvents?: 'auto' | 'box-only' | 'box-one' | 'none'

    children: string | string[] | ReactNode | ReactNode[]
  }
>

export type Context = {
  /** 额外增加的行高，主要用于<片假名终结者> */
  lineHeightIncrease?: number
}
