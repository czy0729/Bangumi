/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-04 06:40:22
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { obc } from '@utils/decorators'
import { TOP_DS } from '../../ds'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Cate(props, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <>
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={TOP_DS}
        selectedIndex={$.state.top}
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

export default obc(Cate, COMPONENT)
