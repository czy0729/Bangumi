/*
 * @Author: czy0729
 * @Date: 2026-08-18 16:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 16:00:00
 */
import React, { memo } from 'react'
import { Text as RNText } from 'react-native'
import { TEXT_STATIC_PROPS } from '../ds'

import type { Props } from './types'

/**
 * 文字渲染
 *  - 接收已计算的样式与内容, 纯转发 RNText
 *  - memo 浅比较: style 数组引用稳定 (getTextStyle 缓存) 时跳过重渲染
 */
function TextContent({ forwardRef, style, selectable, content, ...other }: Props) {
  return (
    <RNText
      ref={forwardRef}
      style={style}
      selectable={selectable}
      numberOfLines={0}
      {...other}
      {...TEXT_STATIC_PROPS}
    >
      {content}
    </RNText>
  )
}

export default memo(TextContent)
