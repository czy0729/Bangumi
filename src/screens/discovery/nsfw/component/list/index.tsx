/*
 * @Author: czy0729
 * @Date: 2019-06-23 02:20:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:20:43
 */
import React, { useCallback, useRef } from 'react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Filter from '../filter'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

import type { ListViewInstance } from '@components'
import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const listRef = useRef<ListViewInstance>(null)

  const handleForwardRef = useCallback(
    (ref: ListViewInstance) => {
      if (ref?.scrollToOffset) {
        $.scrollToOffset = ref.scrollToOffset
        listRef.current = ref
      }
    },
    [$]
  )

  return useObserver(() => {
    const { _loaded, layout, data } = $.state
    if (!_loaded && !data._loaded) {
      return (
        <>
          <Filter />
          <Loading />
        </>
      )
    }

    const numColumns = $.isList ? undefined : _.portrait(3, 5)

    return (
      <PaginationList2
        key={`${layout}${numColumns}`}
        keyExtractor={keyExtractor}
        forwardRef={handleForwardRef}
        contentContainerStyle={_.container.bottom}
        numColumns={numColumns}
        data={$.list}
        limit={9}
        ListHeaderComponent={<Filter />}
        renderItem={renderItem}
        onPage={$.onPage}
      />
    )
  })
}

export default List
