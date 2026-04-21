/*
 * @Author: czy0729
 * @Date: 2024-01-22 09:30:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 05:42:08
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { SegmentedControl } from '@components'
import { useStore } from '@stores'
import { COMPONENT, DS } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { Values } from '@types'

function Segmented() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleValueChange = useCallback(
    (title: Values<typeof DS>) => {
      $.onValueChange(DS.indexOf(title))
    },
    [$]
  )

  const { _loaded, selectedIndex } = $.state
  if (!_loaded) return null

  return (
    <SegmentedControl
      style={styles.segmented}
      values={DS}
      selectedIndex={selectedIndex}
      onValueChange={handleValueChange}
    />
  )
}

export default observer(Segmented)
