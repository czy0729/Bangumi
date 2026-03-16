/*
 * @Author: czy0729
 * @Date: 2024-11-08 06:06:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 05:33:32
 */
import React, { useCallback } from 'react'
import { SegmentedControl } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT, DATA } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Type() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleValueChange = useCallback(
    (type: (typeof DATA)[number]) => {
      $.setState({
        type
      })
    },
    [$]
  )

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <SegmentedControl
        style={styles.segment}
        size={11}
        values={DATA}
        selectedIndex={$.state.type === '简介' ? 0 : 1}
        onValueChange={handleValueChange}
      />
    )
  })
}

export default Type
