/*
 * @Author: czy0729
 * @Date: 2024-10-10 12:41:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-24 20:38:32
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { useStore } from '@stores'
import { keyExtractor } from '@utils'
import ListHeader from '../list-header'
import LoadMore from '../load-more'
import { renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)
  const { fixedHeader } = $.state

  const styles = memoStyles()

  const elListHeader = useMemo(() => <ListHeader />, [])
  const elPlaceholder = useMemo(() => <View />, [])
  const elFooter = useMemo(() => <LoadMore />, [])

  const handleHeaderRefresh = useCallback(() => $.fetchUserCollections(true), [$])
  const handleFooterRefresh = useCallback(() => $.fetchUserCollections(false), [$])

  return (
    <>
      {fixedHeader && <View style={styles.fixedHeader}>{elListHeader}</View>}
      <ListView
        key={$.key}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.container}
        data={$.data}
        numColumns={Number($.state.numColumns)}
        renderItem={renderItem}
        ListHeaderComponent={fixedHeader ? undefined : elListHeader}
        ListFooterComponent={elFooter}
        footerEmptyDataComponent={elPlaceholder}
        footerNoMoreDataComponent={elPlaceholder}
        onHeaderRefresh={handleHeaderRefresh}
        onFooterRefresh={
          !$.state.limit || $.data.list.length < $.state.limit ? handleFooterRefresh : undefined
        }
      />
    </>
  )
}

export default observer(List)
