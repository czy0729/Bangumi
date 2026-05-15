/*
 * @Author: czy0729
 * @Date: 2019-06-23 02:20:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:13:20
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

  // --- Memos (Elements) ---
  const elFilter = useMemo(() => <Filter />, [])

  // --- Render ---
  const { _loaded, data } = $.state
  if (!_loaded && !data._loaded) {
    return (
      <>
        {elFilter}
        <Loading />
      </>
    )
  }

  const numColumns = $.isList ? undefined : _.portrait(_.device(3, 4), 5)
  const key = `${$.state.layout}${numColumns}`

  return (
    <PaginationList2
      key={key}
      keyExtractor={keyExtractor}
      forwardRef={$.forwardRef}
      contentContainerStyle={_.container.bottom}
      numColumns={numColumns}
      data={$.list}
      limit={9}
      ListHeaderComponent={elFilter}
      renderItem={renderItem}
      scrollEventThrottle={16}
      onScroll={$.onScroll}
      onPage={$.onPage}
    />
  )
}

export default observer(List)
