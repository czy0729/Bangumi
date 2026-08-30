/*
 * @Author: czy0729
 * @Date: 2026-08-31 06:58:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 07:32:12
 */
import React, { memo } from 'react'
import WordCloud from '../wordcloud'
import { getWords } from './utils'

import type { Props } from './types'

/** 词云内容组件, props 驱动不接 store (容器样式由上层 observer 传入), 数据变化由上层 key 重挂载重新布局 */
function Canvas({ list, container, style, isCollection, onPress }: Props) {
  return (
    <WordCloud
      style={style}
      options={{
        words: getWords(list),
        verticalEnabled: false,
        minFont: isCollection ? 12 : 14,
        maxFont: isCollection ? 34 : 68,
        fontOffset: 4,
        ...container
      }}
      onPress={onPress}
    />
  )
}

export default memo(Canvas)
