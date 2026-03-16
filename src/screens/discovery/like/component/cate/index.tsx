/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 05:20:14
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { SUBJECT_TYPE } from '@constants'
import { COMPONENT, DATA } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Cate() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={DATA}
        selectedIndex={SUBJECT_TYPE.findIndex(item => item.label === $.state.type)}
        onValueChange={$.onChange}
      />
    )
  })
}

export default Cate
