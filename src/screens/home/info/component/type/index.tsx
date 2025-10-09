/*
 * @Author: czy0729
 * @Date: 2024-11-08 06:06:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 19:01:18
 */
import React, { useCallback } from 'react'
import { SegmentedControl } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT, DATA } from './ds'
import { memoStyles } from './styles'

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
    const { type } = $.state

    return (
      <SegmentedControl
        key={type}
        style={styles.segment}
        size={11}
        values={DATA}
        selectedIndex={type === '简介' ? 0 : 1}
        onValueChange={handleValueChange}
      />
    )
  })
}

export default Type
