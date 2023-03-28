/*
 * @Author: czy0729
 * @Date: 2021-03-06 04:57:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 05:02:08
 */
import React from 'react'
import { Text } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function Rank({ style = undefined, size = 10, value = undefined }) {
  if (!value) return null

  const styles = memoStyles()
  return (
    <Text
      style={stl(
        styles.rank,
        {
          backgroundColor: value <= 500 ? '#ffc107' : '#aaa'
        },
        style
      )}
      size={size}
      bold
      align='center'
    >
      {value}
    </Text>
  )
}

export default ob(Rank)
