/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:40:13
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { SUBJECT_TYPE } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Cate() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { type } = $.state
  return (
    <SegmentedControl
      key={type}
      style={styles.segment}
      size={11}
      values={SUBJECT_TYPE.map(item => item.title)}
      selectedIndex={SUBJECT_TYPE.findIndex(item => item.label === type)}
      onValueChange={$.onChange}
    />
  )
}

export default ob(Cate, COMPONENT)
