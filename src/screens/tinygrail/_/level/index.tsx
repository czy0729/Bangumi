/*
 * @Author: czy0729
 * @Date: 2024-03-05 04:54:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 04:58:20
 */
import React from 'react'
import { Text } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { TextStyle } from '@types'
import { styles } from './styles'

function Level({
  style,
  size = 10,
  value
}: {
  style?: TextStyle
  size?: number
  value: string | number
}) {
  if (Number(value) <= 1) return null

  return (
    <Text style={stl(styles.level, style)} type='ask' size={size} bold>
      lv{value}
    </Text>
  )
}

export default ob(Level)
