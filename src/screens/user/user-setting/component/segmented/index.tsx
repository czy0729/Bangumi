/*
 * @Author: czy0729
 * @Date: 2024-01-22 09:30:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 05:58:26
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT, DS } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Segmented() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <SegmentedControl
      key={String($.state._loaded)}
      style={styles.segmented}
      values={DS}
      selectedIndex={$.state.selectedIndex}
      onValueChange={title => $.onValueChange(DS.indexOf(title))}
    />
  ))
}

export default Segmented
