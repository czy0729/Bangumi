/*
 * @Author: czy0729
 * @Date: 2024-10-10 12:41:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 06:25:58
 *
 * 照片墙列表
 */
import { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import ListHeader from '../list-header'
import LoadMore from '../load-more'
import { getInitialNumToRender, renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)
  const { fixedHeader, numColumns, limit } = $.state
  const { list } = $.data

  const styles = memoStyles()

  // 网格 getItemLayout 的索引同为行索引, 估算行高 = 封面 (宽 × 1.4, 留音乐封面与 autoHeight 余量) + 文字区
  const itemWidth = Math.floor(_.window.contentWidth / (numColumns + 0.2 * numColumns))
  const estimatedItemHeight = Math.floor(itemWidth * 1.4) + 64

  // ListView 的 header / footer 元素保持引用稳定, 避免列表内部状态被重置
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
        estimatedItemHeight={estimatedItemHeight}
        numColumns={numColumns}
        renderItem={renderItem}
        initialNumToRender={getInitialNumToRender(numColumns)}
        ListHeaderComponent={fixedHeader ? undefined : elListHeader}
        ListFooterComponent={elFooter}
        footerEmptyDataComponent={elPlaceholder}
        footerNoMoreDataComponent={elPlaceholder}
        onHeaderRefresh={handleHeaderRefresh}
        onFooterRefresh={!limit || list.length < limit ? handleFooterRefresh : undefined}
      />
    </>
  )
}

export default observer(List)
