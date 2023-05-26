/*
 * 排名标签
 *
 * @Author: czy0729
 * @Date: 2021-03-06 04:57:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-26 12:23:27
 */
import React from 'react'
import { Text } from '@components'
import { systemStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { fontSize } from '@styles'
import { STORYBOOK } from '@constants'
import { memoStyles } from './styles'
import { Props as RankProps } from './types'

export { RankProps }

export const Rank = ob(({ style, size = 10, value }: RankProps) => {
  if (systemStore.setting.hideScore || !value) return null

  const styles = memoStyles()
  const lineHeight = size + 1
  return (
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
  )
})
