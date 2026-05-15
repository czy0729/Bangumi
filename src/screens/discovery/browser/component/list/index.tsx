/*
 * @Author: czy0729
 * @Date: 2022-07-27 05:22:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-30 05:29:33
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils/app'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  // --- Data Logic ---
  const { layout, fixed } = $.state
  const numColumns = $.isList ? undefined : _.portrait(_.device(3, 4), 5)

  // --- Memos (Elements) ---
  const elToolBar = useMemo(() => <ToolBar />, [])

  // --- Render ---
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
}

export default observer(List)
