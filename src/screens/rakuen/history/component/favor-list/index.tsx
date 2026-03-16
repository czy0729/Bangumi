/*
 * @Author: czy0729
 * @Date: 2022-11-27 15:32:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 02:17:11
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { DS } from '../../ds'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function FavorList() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const { type } = $.state

    return (
      <>
        <SegmentedControl
          style={styles.segment}
          size={11}
          values={DS}
          selectedIndex={DS.findIndex(item => item === type)}
          onValueChange={$.onValueChange}
        />
        <PaginationList2
          keyExtractor={keyExtractor}
          contentContainerStyle={_.container.bottom}
          data={$.list}
          limit={12}
          renderItem={renderItem}
          onPage={$.onPage}
        />
      </>
    )
  })
}

export default FavorList
