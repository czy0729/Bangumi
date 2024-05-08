/*
 * @Author: czy0729
 * @Date: 2022-05-01 11:46:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-03 07:02:08
 */
import React from 'react'
import { Text as RNText } from 'react-native'
import Animated from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { r } from '@utils/dev'
import { STORYBOOK } from '@constants'
import { computedLineHeight, format, PAD_INCREASE, setComponentsDefaultProps } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as TextProps, TextType } from './types'

export { setComponentsDefaultProps, TextType, TextProps }

/** 统一封装文字 */
function TextComp({
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
  selectable = STORYBOOK,
  noWrap = false,
  s2t = true,
  children,
  ...other
}: TextProps) {
  r(COMPONENT)

  const styles = memoStyles()
  const _style: TextProps['style'][] = []

  if (type) _style.push(styles[type])
  if (underline) _style.push(styles.underline)
  if (size) _style.push(_[`fontSize${size + _.device(0, PAD_INCREASE)}`])

  const _lineHeight = computedLineHeight(size, lineHeight, lineHeightIncrease)
  if (_lineHeight) {
    _style.push({
      lineHeight: _lineHeight
    })
  }

  if (align && align !== 'left')
    _style.push(align === 'right' ? styles.alignRight : styles.alignCenter)
  if (shadow) _style.push(styles.shadow)
  if (noWrap) _style.push(styles.noWrap)
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
      // @ts-ignore
      android_hyphenationFrequency='none'
    >
      {s2t && systemStore.setting.s2t ? format(children) : children}
    </RNText>
  )
}

export const Text = observer(TextComp)

export const AnimatedText = Animated.createAnimatedComponent(Text)
