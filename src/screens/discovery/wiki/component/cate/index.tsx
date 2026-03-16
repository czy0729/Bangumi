/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 05:31:08
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { SegmentedControl } from '@components'
import { useStore } from '@stores'
import { TOP_DS } from '../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Cate() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
  })
}

export default Cate
