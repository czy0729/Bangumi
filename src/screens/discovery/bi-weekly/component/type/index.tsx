/*
 * @Author: czy0729
 * @Date: 2024-11-08 06:06:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 22:21:56
 */
import React from 'react'
import { observer } from 'mobx-react'
import { SegmentedControl } from '@components'
import { useStore } from '@stores'
import { TYPE_DS } from '../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Type() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { _loaded, type } = $.state
  if (!_loaded) return null

  const styles = memoStyles()

  return (
    <SegmentedControl
      style={styles.segment}
      size={11}
      values={TYPE_DS}
      selectedIndex={type === TYPE_DS[0] ? 0 : 1}
      onValueChange={$.onType}
    />
  )
}

export default observer(Type)
