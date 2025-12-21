/*
 * @Author: czy0729
 * @Date: 2024-03-07 04:59:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 06:36:06
 */
import React from 'react'
import { Text } from '@components'
import { ob } from '@utils/decorators'
import { TextStyle } from '@types'

function Bonus({
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
    <Text style={style} type='warning' size={size} lineHeight={lineHeight || size} bold>
      x{value}{' '}
    </Text>
  )
}

export default ob(Bonus)
