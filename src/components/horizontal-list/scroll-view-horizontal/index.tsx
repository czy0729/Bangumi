/*
 * @Author: czy0729
 * @Date: 2023-11-08 00:47:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-19 08:01:18
 */
import React, { memo } from 'react'
import { ScrollView } from '../../scroll-view'

import type { Props } from './types'

/** 横向滚动容器 */
function ScrollViewHorizontal({ children, contentContainerStyle, ...other }: Props) {
  return (
    <ScrollView
      contentContainerStyle={contentContainerStyle}
      scrollEventThrottle={16}
      animated
      horizontal
      {...other}
    >
      {children}
    </ScrollView>
  )
}

export default memo(ScrollViewHorizontal)
