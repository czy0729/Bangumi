/*
 * @Author: czy0729
 * @Date: 2021-03-13 14:59:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 14:13:14
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { ob } from '@utils/decorators'
import { styles } from './styles'

const TYPE_DS = ['全部', '收藏'] as const

function Type({ type, onChange }) {
  return (
    <SegmentedControl
      style={styles.segment}
      size={11}
      values={TYPE_DS}
      selectedIndex={type === 'collect' ? 1 : 0}
      onValueChange={onChange}
    />
  )
}

export default ob(Type)
