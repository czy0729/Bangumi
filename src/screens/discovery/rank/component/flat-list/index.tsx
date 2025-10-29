/*
 * @Author: czy0729
 * @Date: 2025-10-29 22:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-29 23:41:09
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor, stl } from '@utils'
import { useObserver } from '@utils/hooks'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function FlatList() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRefresh = useCallback(() => $.fetchRankWithoutPagination(true), [$])

  return useObserver(() => {
    const styles = memoStyles()
    const { show, fixed } = $.state
    const elToolbar = <ToolBar />
    const numColumns = $.isList ? undefined : _.portrait(3, 5)

    return (
      <>
        {fixed && <View style={styles.fixedToolBar}>{elToolbar}</View>}
        {show && !!$.list._loaded && (
          <ListView
            key={`${$.list}${numColumns}`}
            keyExtractor={keyExtractor}
            contentContainerStyle={stl(
              !fixed ? styles.contentContainerStyle : _.container.bottom,
              !$.isList && styles.grid
            )}
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
  })
}

export default FlatList
