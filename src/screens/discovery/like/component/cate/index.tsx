/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-22 20:30:49
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
    const { type } = $.state

    return (
      <SegmentedControl
        key={type}
        style={styles.segment}
        size={11}
        values={DATA}
        selectedIndex={SUBJECT_TYPE.findIndex(item => item.label === type)}
        onValueChange={$.onChange}
      />
    )
  })
}

export default Cate
