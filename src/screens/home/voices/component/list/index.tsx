/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:38:35
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { useObserver } from '@utils/hooks'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.monoVoices._loaded) return null

    return (
      <PaginationList2
        keyExtractor={keyExtractor}
        contentContainerStyle={_.container.bottom}
        data={$.monoVoices.list}
        limit={6}
        renderItem={renderItem}
        scrollEventThrottle={16}
        onScroll={$.onScroll}
        onHeaderRefresh={$.onHeaderRefresh}
      />
    )
  })
}

export default List
