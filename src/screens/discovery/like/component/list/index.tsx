/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-14 14:39:50
 */
import React from 'react'
import { observer } from 'mobx-react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.state._loaded) return null

  return (
    <PaginationList2
      key={$.state.type}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.list}
      limit={12}
      renderItem={renderItem}
      onScroll={$.onScroll}
      onPage={$.onPage}
      onNextPage={$.onNextPage}
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default observer(List)
