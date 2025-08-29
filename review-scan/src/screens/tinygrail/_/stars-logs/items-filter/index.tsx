/*
 * @Author: czy0729
 * @Date: 2025-04-21 20:49:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 05:31:18
 */
import React from 'react'
import { ITEMS_DS } from '../ds'
import SegmentedControl from '../../segmented-control'
import { styles } from './styles'

function ItemsFilter({ value, onValueChange }) {
  return (
    <SegmentedControl
      style={styles.segment}
      values={ITEMS_DS}
      selectedIndex={ITEMS_DS.findIndex(item => item === value)}
      onValueChange={onValueChange}
    />
  )
}

export default ItemsFilter
