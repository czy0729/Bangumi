/*
 * @Author: czy0729
 * @Date: 2023-11-04 15:38:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-05 04:48:23
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { ob } from '@utils/decorators'
import { COMPONENT, DS } from './ds'
import { styles } from './styles'

function RecSegement({ value, onValueChange }) {
  return (
    <SegmentedControl
      style={styles.segment}
      size={11}
      values={DS}
      selectedIndex={value ? 1 : 0}
      onValueChange={onValueChange}
    />
  )
}

export default ob(RecSegement, COMPONENT)
