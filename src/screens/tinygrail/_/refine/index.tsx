/*
 * @Author: czy0729
 * @Date: 2024-03-03 06:46:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 09:26:31
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { stl } from '@utils'
import { styles } from './styles'

import type { TextStyle } from '@types'

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

export default observer(Refine)
