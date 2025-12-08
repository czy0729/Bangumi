/*
 * @Author: czy0729
 * @Date: 2024-10-10 12:41:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-08 08:15:28
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { ListView } from '@components'
import { useStore } from '@stores'
import { keyExtractor } from '@utils'
import { useObserver } from '@utils/hooks'
import ListHeader from '../list-header'
import { renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elListHeader = useMemo(() => <ListHeader />, [])
  const elPlaceholder = useMemo(() => <View />, [])

  return useObserver(() => {
    const styles = memoStyles()

    const handleHeaderRefresh = useCallback(() => $.fetchUserCollections(true), [])
    const handleFooterRefresh = useCallback(() => $.fetchUserCollections(false), [])

    return (
      <ListView
        key={$.key}
        keyExtractor={keyExtractor}
        style={styles.list}
        contentContainerStyle={styles.container}
        data={$.data}
        numColumns={Number($.state.numColumns)}
        renderItem={renderItem}
        ListHeaderComponent={elListHeader}
        footerEmptyDataComponent={elPlaceholder}
        footerNoMoreDataComponent={elPlaceholder}
        onHeaderRefresh={handleHeaderRefresh}
        onFooterRefresh={
          !$.state.limit || $.data.list.length < $.state.limit ? handleFooterRefresh : undefined
        }
      />
    )
  })
}

export default List
