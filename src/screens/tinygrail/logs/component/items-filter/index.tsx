/*
 * @Author: czy0729
 * @Date: 2025-04-21 20:49:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-06 15:05:27
 */
import React from 'react'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import SegmentedControl from '@tinygrail/_/segmented-control'
import { ITEMS_DS } from '../../ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function ItemsFilter() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const { itemsType } = $.state

    return (
      <SegmentedControl
        style={styles.segment}
        values={ITEMS_DS}
        selectedIndex={ITEMS_DS.findIndex(item => item === itemsType)}
        onValueChange={$.onItemsTypeChange}
      />
    )
  })
}

export default ItemsFilter
