/*
 * @Author: czy0729
 * @Date: 2025-07-17 13:16:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 09:11:02
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <PaginationList2
      key={$.state.sort}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.computedList}
      renderItem={renderItem}
      onHeaderRefresh={$.refresh}
    />
  ))
}

export default List
