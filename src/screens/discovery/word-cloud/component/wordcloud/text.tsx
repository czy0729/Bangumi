/*
 * @Author: czy0729
 * @Date: 2024-09-27 14:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-06 09:02:36
 */
import React from 'react'
import { Text as TextComp, Touchable } from '@components'

import type { TextProps } from './types'

function Text({ style, onPress, onLayout, children }: TextProps) {
  const el = (
    <TextComp style={style} noWrap onLayout={onLayout}>
      {children}
    </TextComp>
  )

  if (onPress) return <Touchable onPress={onPress}>{el}</Touchable>

  return el
}

export default Text
