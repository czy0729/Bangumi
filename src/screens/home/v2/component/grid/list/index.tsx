/*
 * @Author: czy0729
 * @Date: 2022-11-21 06:55:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-22 00:00:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { PaginationList } from '@_'
import { _, systemStore, useStore } from '@stores'
import { memoStyles } from '../styles'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function List({ title }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  const numColumns = _.isMobileLanscape ? 9 : _.device(4, 5)

  // 网格模式暂不启用 estimatedItemHeight：FlatList numColumns>1 时 getItemLayout 按「行」索引调用，
  // 现有高度缓存按条目索引存储会整体错位，需按行改造后才支持（components/list-view/hooks/useItemHeights）
  return (
    <PaginationList
      key={`${_.orientation}${numColumns}`}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.contentContainerStyle}
      data={$.currentCollection(title).list}
      progressViewOffset={20}
      limit={systemStore.setting.homeGridCoverLayout === 'square' ? 20 : 16}
      numColumns={numColumns}
      renderItem={renderItem}
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default observer(List)
