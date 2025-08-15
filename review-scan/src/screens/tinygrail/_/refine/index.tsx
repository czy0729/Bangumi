/*
 * @Author: czy0729
 * @Date: 2024-03-03 06:46:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 04:57:50
 */
import React from 'react'
import { Text } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { TextStyle } from '@types'
import { styles } from './styles'

function Refine({
  style,
  size = 10,
  value
}: {
  style?: TextStyle
  size?: number
  value: string | number
}) {
  if (!value) return null

  return (
    <Text style={stl(styles.refine, style)} size={size} bold>
      +{value}{' '}
    </Text>
  )
}

export default ob(Refine)
