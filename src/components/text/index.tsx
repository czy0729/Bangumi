/*
 * 统一封装文字
 * @Author: czy0729
 * @Date: 2022-05-01 11:46:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-03 11:30:44
 */
import React from 'react'
import { Text as RNText } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { TextStyle } from '@types'
import { PAD_INCREASE, computedLineHeight, format } from './utils'
import memoStyles from './styles'

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

type Props = {
  /** 样式 */
  style?: TextStyle

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
  align?: 'center' | 'right'

  /** 是否加粗 */
  bold?: boolean

  /** 是否下划线 */
  underline?: boolean

  /** 是否带阴影 */
  shadow?: boolean

  /** 是否可选择 */
  selectable?: boolean

  children: React.ReactNode
}

type Context = {
  /** 额外增加的行高，主要用于<片假名终结者> */
  lineHeightIncrease?: number
}

function CompText(
  {
    style,
    type = 'desc',
    size = 14,
    lineHeight,
    lineHeightIncrease,
    align,
    bold = false,
    underline = false,
    shadow = false,
    selectable = false,
    children,
    ...other
  }: Props,
  { lineHeightIncrease: contextLineHeightIncrease = 0 }: Context
) {
  const styles = memoStyles()
  const _style: TextStyle[] = [styles.text]

  if (type) _style.push(styles[type])
  if (underline) _style.push(styles.underline)
  if (size) _style.push(_[`fontSize${size + _.device(0, PAD_INCREASE)}`])
  const _lineHeight = computedLineHeight(
    size,
    lineHeight,
    lineHeightIncrease,
    contextLineHeightIncrease
  )
  if (_lineHeight) {
    _style.push({
      lineHeight: _lineHeight
    })
  }

  if (align) _style.push(align === 'right' ? styles.alignRight : styles.alignCenter)
  if (bold) _style.push(styles.bold)
  if (shadow) _style.push(styles.shadow)
  if (style) _style.push(style)

  return (
    <RNText
      style={_style}
      allowFontScaling={false}
      selectable={selectable}
      numberOfLines={0}
      {...other}
      textBreakStrategy='simple'
      // @ts-ignore
      android_hyphenationFrequency='none'
    >
      {systemStore.setting.s2t ? format(children) : children}
    </RNText>
  )
}

CompText.contextTypes = {
  lineHeightIncrease: PropTypes.number
}

export const Text = observer(CompText)
