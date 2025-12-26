/*
 * @Author: czy0729
 * @Date: 2024-11-08 06:06:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 04:26:09
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TYPE_DS } from '../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Type() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const { type } = $.state

    return (
      <SegmentedControl
        key={type}
        style={styles.segment}
        size={11}
        values={TYPE_DS}
        selectedIndex={type === TYPE_DS[0] ? 0 : 1}
        onValueChange={$.onType}
      />
    )
  })
}

export default Type
