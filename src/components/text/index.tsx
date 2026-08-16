/*
 * @Author: czy0729
 * @Date: 2022-05-01 11:46:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 05:43:09
 */
import React, { useContext } from 'react'
import { Text as RNText } from 'react-native'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { WEB } from '@constants'
import { LineHeightIncreaseContext } from './context'
import { formatS2T, formatSpacing, getTextStyle, setComponentsDefaultProps } from './utils'
import { COMPONENT, TEXT_STATIC_PROPS } from './ds'

export { getTextStyle, setComponentsDefaultProps }
export { LineHeightIncreaseContext } from './context'

import type { Props as TextProps, TextType } from './types'
export type { TextType, TextProps }

/** 统一封装文字 */
function TextComp({
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
  shrink,
  selectable = WEB,
  noWrap,
  s2t = true,
  spacing = true,
  children,
  ...other
}: TextProps) {
  r(COMPONENT)

  const contextIncrease = useContext(LineHeightIncreaseContext)

  let content = children
  if (s2t && systemStore.setting.s2t) content = formatS2T(content)
  if (spacing && systemStore.setting.spacing) content = formatSpacing(content)

  return (
    <RNText
      ref={forwardRef}
      style={getTextStyle({
        style,
        overrideStyle,
        type,
        size,
        lineHeight,
        lineHeightIncrease: lineHeightIncrease ?? contextIncrease,
        align,
        bold,
        underline,
        shadow,
        shrink,
        noWrap
      })}
      selectable={selectable}
      numberOfLines={0}
      {...other}
      {...TEXT_STATIC_PROPS}
    >
      {content}
    </RNText>
  )
}

export const Text = observer(TextComp)

export default Text
