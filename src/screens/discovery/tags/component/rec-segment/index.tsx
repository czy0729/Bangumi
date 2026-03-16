/*
 * @Author: czy0729
 * @Date: 2023-11-04 15:38:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 05:21:03
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { SegmentedControl } from '@components'
import { r } from '@utils/dev'
import { COMPONENT, DS } from './ds'
import { styles } from './styles'

function RecSegement({ value, onValueChange }) {
  r(COMPONENT)

  return useObserver(() => (
    <SegmentedControl
      style={styles.segment}
      size={11}
      values={DS}
      selectedIndex={value ? 1 : 0}
      onValueChange={onValueChange}
    />
  ))
}

export default RecSegement
