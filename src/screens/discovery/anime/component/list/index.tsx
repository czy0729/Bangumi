/*
 * @Author: czy0729
 * @Date: 2019-06-23 02:20:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-04 17:37:11
 */
import React, { useMemo } from 'react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Filter from '../filter'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elFilter = useMemo(() => <Filter />, [])

  return useObserver(() => {
    if (!$.state._loaded && !$.state.data._loaded) {
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
        key={`${$.state.layout}${numColumns}`}
        keyExtractor={keyExtractor}
        forwardRef={$.forwardRef}
        contentContainerStyle={_.container.page}
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
  })
}

export default List
