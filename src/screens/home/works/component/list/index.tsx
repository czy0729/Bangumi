/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 02:50:20
 */
import React, { useMemo } from 'react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { useObserver } from '@utils/hooks'
import ToolBar from '../tool-bar'
import { renderGridItem, renderListItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elToolBar = useMemo(() => <ToolBar />, [])

  return useObserver(() => {
    const { fixed, list } = $.state
    const numColumns = list ? undefined : _.portrait(3, 5)

    return (
      <>
        {fixed && elToolBar}
        <ListView
          key={`${_.orientation}|${numColumns}`}
          keyExtractor={keyExtractor}
          contentContainerStyle={_.container.bottom}
          data={$.list}
          numColumns={numColumns}
          ListHeaderComponent={!fixed && elToolBar}
          renderItem={list ? renderListItem : renderGridItem}
          scrollEventThrottle={16}
          onScroll={$.onScroll}
          onHeaderRefresh={$.onHeaderRefresh}
          onFooterRefresh={$.fetchMonoWorks}
        />
      </>
    )
  })
}

export default List
