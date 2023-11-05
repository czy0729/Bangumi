/*
 * @Author: czy0729
 * @Date: 2023-11-04 15:38:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-04 15:44:18
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { styles } from './styles'

const DS = ['数量', '排名'] as const

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

export default RecSegement
