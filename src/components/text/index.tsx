/*
 * @Author: czy0729
 * @Date: 2022-05-01 11:46:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-03 07:02:08
 */
import React from 'react'
import { Text as RNText } from 'react-native'
import Animated from 'react-native-reanimated'
import { useObserver } from 'mobx-react'
import PropTypes from 'prop-types'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { STORYBOOK } from '@constants'
import { format, getTextStyle, setComponentsDefaultProps } from './utils'
import { COMPONENT } from './ds'
import { Context, Props as TextProps, TextType } from './types'

export { setComponentsDefaultProps, getTextStyle, TextType, TextProps }

/** 统一封装文字 */
function TextComp(
  {
    forwardRef,
    style,
    overrideStyle,
    type,
    size,
    lineHeight,
    lineHeightIncrease,
    align,
    bold,
    underline,
    shadow,
    selectable = STORYBOOK,
    noWrap,
    s2t = true,
    children,
    ...other
  }: TextProps,
  { lineHeightIncrease: contextLineHeightIncrease }: Context
) {
  r(COMPONENT)

  return useObserver(() => (
    <RNText
      ref={forwardRef}
      style={getTextStyle({
        style,
        overrideStyle,
        type,
        size,
        lineHeight,
        lineHeightIncrease: contextLineHeightIncrease || lineHeightIncrease,
        align,
        bold,
        underline,
        shadow,
        noWrap
      })}
      allowFontScaling={false}
      selectable={selectable}
      numberOfLines={0}
      {...other}
      suppressHighlighting
      textBreakStrategy='simple'
      android_hyphenationFrequency='none'
    >
      {s2t && systemStore.setting.s2t ? format(children) : children}
    </RNText>
  ))
}

TextComp.contextTypes = {
  lineHeightIncrease: PropTypes.number
}

export const Text = TextComp
