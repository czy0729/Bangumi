/*
 * 统一封装文字
 * @Author: czy0729
 * @Date: 2022-05-01 11:46:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-11 15:51:24
 */
import React from 'react'
import { Text as RNText } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import {
  PAD_INCREASE,
  setComponentsDefaultProps,
  computedLineHeight,
  format
} from './utils'
import { memoStyles } from './styles'
import { TextType, Props as TextProps, Context } from './types'

export { setComponentsDefaultProps, TextType, TextProps }

function CompText(
  {
    forwardRef,
    style,
    overrideStyle,
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
  }: TextProps,
  { lineHeightIncrease: contextLineHeightIncrease = 0 }: Context
) {
  const styles = memoStyles()
  const _style: TextProps['style'][] = []

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
  if (shadow) _style.push(styles.shadow)
  if (style) _style.push(style)

  // 若需要设置字体, rn 环境下与 web 不同, 若 font-weight 设置是该字体没有支持的
  // 依然不会显示成该字体, 所以需要在最后设置
  _style.push(styles.text)
  if (bold) _style.push(styles.bold)
  if (overrideStyle) _style.push(overrideStyle)

  return (
    <RNText
      ref={forwardRef}
      style={_style}
      allowFontScaling={false}
      selectable={selectable}
      numberOfLines={0}
      {...other}
      suppressHighlighting
      textBreakStrategy='simple'
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
