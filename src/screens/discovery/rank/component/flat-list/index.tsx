/*
 * @Author: czy0729
 * @Date: 2025-10-29 22:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-22 20:47:29
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor, stl } from '@utils'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function FlatList() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elToolbar = useMemo(() => <ToolBar />, [])

  const handleHeaderRefresh = useCallback(() => $.fetchRankWithoutPagination(true), [$])

  const styles = memoStyles()

  const { show, fixed } = $.state
  const numColumns = $.isList ? undefined : _.portrait(_.device(3, 4), 5)

  return (
    <>
      {fixed && elToolbar}
      {show && !!$.list._loaded && (
        <ListView
          key={`${$.isList}|${numColumns}`}
          keyExtractor={keyExtractor}
          contentContainerStyle={stl(_.container.bottom, !$.isList && styles.grid)}
          numColumns={numColumns}
          data={$.list}
          ListHeaderComponent={!fixed && elToolbar}
          renderItem={renderItem}
          scrollEventThrottle={16}
          onScroll={$.onScroll}
          onHeaderRefresh={handleHeaderRefresh}
          onFooterRefresh={$.fetchRankWithoutPagination}
        />
      )}
    </>
  )
}

export default observer(FlatList)
