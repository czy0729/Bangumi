/*
 * @Author: czy0729
 * @Date: 2024-04-02 17:26:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 01:30:07
 */
import React, { useMemo } from 'react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elToolBar = useMemo(() => <ToolBar />, [])

  return useObserver(() => {
    const { fixed } = $.state

    return (
      <>
        {fixed && elToolBar}
        <PaginationList2
          key={$.state.sort}
          contentContainerStyle={_.container.bottom}
          data={$.data}
          limit={24}
          ListHeaderComponent={!fixed && elToolBar}
          renderItem={renderItem}
          onScroll={$.onScroll}
          onPage={$.onPage}
        />
      </>
    )
  })
}

export default List
