/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 22:26:16
 */
import React from 'react'
import { observer } from 'mobx-react'
import { SegmentedControl } from '@components'
import { useStore } from '@stores'
import { TOP_DS } from '../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Cate() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { _loaded, top } = $.state
  if (!_loaded) return null

  const styles = memoStyles()

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
        style={styles.segment}
        size={11}
        values={$.segement.values}
        selectedIndex={$.segement.selectedIndex}
        onValueChange={$.onChangeSub}
      />
    </>
  )
}

export default observer(Cate)
