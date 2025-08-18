/*
 * @Author: czy0729
 * @Date: 2021-03-06 04:57:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-03 15:05:30
 */
import React from 'react'
import { Component, Text } from '@components'
import { systemStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import { fontSize } from '@styles'
import { COMPONENT } from './ds'
import { Props as RankProps } from './types'
import { memoStyles } from './styles'

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
          WEB && size < 12 && fontSize(size, lineHeight, true),
          WEB && styles.fit
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

export default Rank
