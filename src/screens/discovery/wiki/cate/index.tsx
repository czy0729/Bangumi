/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-27 21:16:05
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { obc } from '@utils/decorators'
import { TOP_DS } from '../ds'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Cate(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { top } = $.state
  return (
    <>
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={TOP_DS}
        selectedIndex={top}
        onValueChange={$.onChangeTop}
      />
      <SegmentedControl
        key={$.segement.key}
        style={styles.segment}
        size={11}
        values={$.segement.values}
        selectedIndex={$.segement.selectedIndex}
        onValueChange={$.onChangeSub}
      />
    </>
  )
}

export default obc(Cate)
