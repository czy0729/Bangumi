/*
 * @Author: czy0729
 * @Date: 2022-06-13 10:52:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 17:00:00
 */
import type { MutableRefObject } from 'react'
import type { Text as RNText, TextProps } from 'react-native'
import type { Override, TextStyle } from '@types'

/**
 * 文字预设主题色
 *  - plain 主题未上色; __plain__ 更深一档的底色 (对应 __colorPlain__)
 *  - main / primary / success / warning / danger 为主题强调色
 *  - title / desc / sub / icon / border / avatar 为层级字体色
 *  - bid / ask / tinygrail* 为英灵殿相关配色
 */
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

/**
 * 统一文字组件 props
 *  - 在 RNText props 基础上扩展文字渲染控制项, 样式最终顺序为
 *    base > type > underline > fontSize > lineHeight > align > shadow > shrink > noWrap
 *    > letterSpacing > style > text > bold > overrideStyle
 */
export type Props = Override<
  TextProps,
  {
    /** 获取 ref */
    forwardRef?: MutableRefObject<RNText>

    /** 自定义样式, 追加在主题样式之后 */
    style?: TextStyle

    /** 强制覆盖样式, 追加在最后 (含 fontFamily 之后) */
    overrideStyle?: TextStyle

    /** 预设主题色 */
    type?: TextType

    /** 字号大小, 会按当前字体缩放适配取对应 fontSizeXX */
    size?: number

    /**
     * 行高
     *  - 小于等于 2 的时候为比例, 最终行高 = size * lineHeight
     *  - 大于 2 的时候为数值, 最终行高 = lineHeight
     * */
    lineHeight?: number

    /** 额外增加的行高 (主要用于 「片假名终结者」, 也受 LineHeightIncreaseContext 影响) */
    lineHeightIncrease?: number

    /** 对齐方式, left 为默认不追加样式 */
    align?: 'left' | 'center' | 'right' | 'justify'

    /** 是否加粗 */
    bold?: boolean

    /** 是否下划线 */
    underline?: boolean

    /** 是否带阴影 */
    shadow?: boolean

    /** 允许文本收缩 (flexShrink: 1) */
    shrink?: boolean

    /** 是否可选择, 默认仅网页端为 true */
    selectable?: boolean

    /** 是否不允许换行 (仅在网页端生效) */
    noWrap?: boolean

    /** 是否允许自动转换简繁体, 受全局 setting.s2t 控制 */
    s2t?: boolean

    /** 是否允许自动转换文案排版, 受全局 setting.spacing 控制 */
    spacing?: boolean
  }
>
