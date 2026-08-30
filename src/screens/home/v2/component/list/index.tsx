/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-22 06:47:37
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Loading } from '@components'
import { PaginationList } from '@_'
import { systemStore, useStore } from '@stores'
import { MODEL_SETTING_HOME_ANIME_INFO_INLINE, MODEL_SETTING_HOME_LAYOUT } from '@constants'
import Grid from '../grid/index.lazy'
import { ITEM_HEIGHT, ITEM_HEIGHT_COMPACT, ITEM_HEIGHT_INFO_INLINE } from '../item/ds'
import { useListElements, useListStyle } from './hooks'
import { keyExtractor } from './utils'
import { COMPONENT } from './ds'

import type { ScrollToIndex } from '@components'
import type { Ctx } from '../../types'
import type { ItemType, Props } from './types'

function ListWrap({ title = '全部' }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const isSingleTab = $.tabs.length <= 1
  const style = useListStyle(isSingleTab)

  const handleForwardRef = useCallback(
    (ref: { scrollToIndex: ScrollToIndex }) => $.forwardRef(ref, title),
    [$, title]
  )

  const data = $.currentCollection(title)
  const homeFilter = systemStore.setting.homeFilter
  const showItem = $.showItem(title)
  const { elListHeaderComponent, elEmpty, handleRenderItem } = useListElements({
    title,
    showItem,
    homeFilter,
    length: data.list.length
  })

  if (systemStore.setting.homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('网格'))
    return <Grid title={title} />
  if (!$.collection._loaded) return <Loading />
  if (!showItem) return null

  const hasInfoInline =
    MODEL_SETTING_HOME_ANIME_INFO_INLINE.getValue('底部') ===
    systemStore.setting.homeAnimeInfoInline

  return (
    <PaginationList
      keyExtractor={keyExtractor}
      forwardRef={handleForwardRef}
      contentContainerStyle={style}
      progressViewOffset={style.paddingTop}
      data={data.list as ItemType[]}
      limit={16}
      estimatedItemHeight={
        (systemStore.setting.homeListCompact ? ITEM_HEIGHT_COMPACT : ITEM_HEIGHT) +
        (hasInfoInline ? ITEM_HEIGHT_INFO_INLINE : 0)
      }
      keyboardDismissMode='on-drag'
      ListHeaderComponent={elListHeaderComponent}
      renderItem={handleRenderItem}
      footerEmptyDataComponent={elEmpty}
      footerNoMoreDataComponent={elEmpty}
      footerNoMoreDataText=''
      scrollEventThrottle={16}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={title === '游戏' ? $.onFooterRefresh : undefined}
    />
  )
}

export default observer(ListWrap)
