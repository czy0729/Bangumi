/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-22 07:53:19
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { obc } from '@utils/decorators'
import { SUBJECT_TYPE } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Cate(props, { $ }: Ctx) {
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

export default obc(Cate, COMPONENT)
