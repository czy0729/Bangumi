/*
 * @Author: czy0729
 * @Date: 2022-05-01 11:46:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 16:30:00
 */
import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { WEB } from '@constants'
import { LineHeightIncreaseContext } from './context'
import TextContent from './text-content'
import { formatS2T, formatSpacing, getTextStyle, setComponentsDefaultProps } from './utils'
import { COMPONENT } from './ds'

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
    <TextContent
      forwardRef={forwardRef}
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
      content={content}
      {...other}
    />
  )
}

export const Text = observer(TextComp)

export default Text
