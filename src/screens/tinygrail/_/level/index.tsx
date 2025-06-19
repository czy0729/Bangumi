/*
 * @Author: czy0729
 * @Date: 2024-03-05 04:54:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-19 17:06:26
 */
import React from 'react'
import { Text } from '@components'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'
import { Props } from './types'

function Level({ style, size = 10, lineHeight = 10, st = 0, value }: Props) {
  return useObserver(() => {
    if (!value && value !== 0) return null

    if (value === 0) {
      const styles = memoStyles()
      return (
        <Text
          style={stl(style, styles.st)}
          type='__plain__'
          size={size - 1}
          lineHeight={(lineHeight || size) - 1}
          bold
        >
          {' '}
          ST{st === 0 ? '' : st}{' '}
        </Text>
      )
    }

    return (
      <Text style={style} type='ask' size={size} lineHeight={lineHeight || size} bold>
        lv{value}{' '}
      </Text>
    )
  })
}

export default Level
