/*
 * @Author: czy0729
 * @Date: 2021-03-06 04:57:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:49:23
 */
import React from 'react'
import { Component, Text } from '@components'
import { systemStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import { fontSize } from '@styles'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as RankProps } from './types'

export { RankProps }

/** 排名标签 */
export const Rank = ob(({ style, size = 10, value }: RankProps) => {
  if (systemStore.setting.hideScore || !value) return null

  const styles = memoStyles()
  const lineHeight = size + 1
  return (
    <Component id='base-rank'>
      <Text
        style={stl(
          styles.rank,
          style,
          STORYBOOK && size < 12 && fontSize(size, lineHeight, true),
          STORYBOOK && styles.fit
        )}
        size={size}
        lineHeight={lineHeight}
        bold
        align='center'
        noWrap
      >
        {value}
      </Text>
    </Component>
  )
}, COMPONENT)
