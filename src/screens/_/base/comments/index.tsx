/*
 * @Author: czy0729
 * @Date: 2025-01-24 05:45:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-25 14:50:02
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Expand, Text } from '@components'
import { getVisualLength, sliceByVisualLength } from '@utils'
import { r } from '@utils/dev'
import { useComments } from './hooks'
import { COMPONENT } from './ds'

import type { Props as CommentsProps } from './types'

export const Comments = observer(({ style, numberOfLines, value, maxLength = 0 }: CommentsProps) => {
  r(COMPONENT)

  const {
    lines,
    processedValue,
    maxLengthExpanded,
    setMaxLengthExpanded,
    handlePress,
    handleTextLayout,
    handleLongPress,
    size,
    textStyle
  } = useComments(value, numberOfLines, style)

  // maxLength 模式：超过视觉长度时用 Expand 包裹
  if (maxLength > 0 && getVisualLength(processedValue) > maxLength) {
    if (maxLengthExpanded) {
      return (
        <Text style={textStyle} size={size} lineHeight={16} onLongPress={handleLongPress}>
          {processedValue}
        </Text>
      )
    }

    return (
      <Expand ratio={1} onExpand={() => setMaxLengthExpanded(true)}>
        <Text style={textStyle} size={size} lineHeight={16}>
          {sliceByVisualLength(processedValue, maxLength)}
        </Text>
      </Expand>
    )
  }

  return (
    <Text
      style={textStyle}
      size={size}
      lineHeight={16}
      numberOfLines={lines}
      onTextLayout={handleTextLayout}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      {processedValue}
    </Text>
  )
})

export default Comments
