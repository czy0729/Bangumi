/*
 * @Author: czy0729
 * @Date: 2021-03-06 04:57:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 03:05:30
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

import type { Props } from './types'

function Rank({ style, size = 9, value }: Props) {
  return useObserver(() => {
    if (!value) return null

    const styles = memoStyles()

    return (
      <Text
        style={stl(
          styles.rank,
          {
            backgroundColor: Number(value) <= 500 ? '#ffc107' : '#aaa',
            opacity: _.select(1, 0.92)
          },
          style
        )}
        size={size}
        lineHeight={1}
        bold
        align='center'
        shadow
      >
        {value}
      </Text>
    )
  })
}

export default Rank
