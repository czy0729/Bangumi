/*
 * @Author: czy0729
 * @Date: 2024-03-05 04:54:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 06:36:26
 */
import React from 'react'
import { Text } from '@components'
import { ob } from '@utils/decorators'
import { TextStyle } from '@types'

function Level({
  style,
  size = 10,
  lineHeight = 10,
  value
}: {
  style?: TextStyle
  size?: number
  lineHeight?: number
  value: string | number
}) {
  if (!value || Number(value) <= 1) return null

  return (
    <Text style={style} type='ask' size={size} lineHeight={lineHeight || size} bold>
      lv{value}{' '}
    </Text>
  )
}

export default ob(Level)
