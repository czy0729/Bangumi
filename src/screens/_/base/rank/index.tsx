/*
 * 排名标签
 *
 * @Author: czy0729
 * @Date: 2021-03-06 04:57:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-13 10:34:18
 */
import React from 'react'
import { Text } from '@components'
import { systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'
import { Props as RankProps } from './types'

export { RankProps }

export const Rank = ob(({ style, size = 10, value }: RankProps) => {
  if (systemStore.setting.hideScore || !value) return null

  const styles = memoStyles()
  return (
    <Text
      style={[styles.rank, style]}
      size={size}
      lineHeight={size + 1}
      bold
      align='center'
    >
      {value}
    </Text>
  )
})
