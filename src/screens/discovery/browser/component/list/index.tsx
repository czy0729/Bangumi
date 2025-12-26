/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:22:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-21 22:48:03
 */
import React, { useMemo } from 'react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils/app'
import { useObserver } from '@utils/hooks'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elToolBar = useMemo(() => <ToolBar />, [])

  return useObserver(() => {
    const { layout, fixed } = $.state
    const numColumns = $.isList ? undefined : _.portrait(3, 5)

    return (
      <>
        {fixed && elToolBar}
        {!!$.list._loaded && (
          <ListView
            key={`${layout}|${numColumns}`}
            keyExtractor={keyExtractor}
            ref={$.forwardRef}
            contentContainerStyle={_.container.bottom}
            numColumns={numColumns}
            data={$.list}
            ListHeaderComponent={!fixed && elToolBar}
            renderItem={renderItem}
            scrollEventThrottle={16}
            onScroll={$.onScroll}
            onHeaderRefresh={$.onHeaderRefresh}
            onFooterRefresh={$.fetchBrowser}
          />
        )}
      </>
    )
  })
}

export default List
