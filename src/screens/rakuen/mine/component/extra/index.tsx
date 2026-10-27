/*
 * @Author: czy0729
 * @Date: 2022-02-24 18:55:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-27 00:00:00
 */
import { observer } from 'mobx-react'
import { SegmentedControl } from '@components'
import { useStore } from '@stores'
import { COMPONENT, TYPE_DS } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Extra() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { type, _loaded } = $.state
  if (!_loaded) return null

  return (
    <SegmentedControl
      style={styles.segment}
      size={11}
      values={TYPE_DS}
      selectedIndex={type === 'all' ? 1 : 0}
      onValueChange={$.onChange}
    />
  )
}

export default observer(Extra)
