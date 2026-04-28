/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:21:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:10:46
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import Filter from '../filter'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  // --- Data Logic ---
  const { _loaded, layout, data } = $.state
  const isInitialLoading = !_loaded && !data._loaded

  // --- Memos (Elements) ---
  const elFilter = useMemo(() => <Filter />, [])

  // --- Render ---
  if (isInitialLoading) {
    return (
      <>
        {elFilter}
        <Loading />
      </>
    )
  }

  const numColumns = $.isList ? undefined : _.portrait(3, 5)

  return (
    <PaginationList2
      key={`${layout}${numColumns}`}
      forwardRef={$.forwardRef}
      contentContainerStyle={_.container.bottom}
      data={$.list}
      limit={9}
      numColumns={numColumns}
      ListHeaderComponent={elFilter}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onPage={$.onPage}
    />
  )
}

export default observer(List)
