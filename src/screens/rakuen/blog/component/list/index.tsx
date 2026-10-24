/*
 * @Author: czy0729
 * @Date: 2022-03-15 21:18:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 日志主体: 评论列表 + 底部区域
 */
import { useMemo } from 'react'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { ITEM_POST_HEIGHT } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import Bottom from '../bottom'
import Top from '../top'
import TouchScroll from '../touch-scroll'
import { useListElements, useListScroll } from './hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

/** 日志主体 */
function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { handleListViewRef, handleScrollToThenFeedback, handleScrollToIndexFailed } =
    useListScroll()
  const { fixedTextareaRef, renderItem } = useListElements()

  // estimatedItemHeight 要求头部为稳定引用
  const elListHeaderComponent = useMemo(() => <Top />, [])

  return (
    <>
      <ListView
        ref={handleListViewRef}
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={$.comments}
        skipEnteringExitingAnimations={4}
        estimatedItemHeight={ITEM_POST_HEIGHT}
        ListHeaderComponent={elListHeaderComponent}
        renderItem={renderItem}
        onScroll={$.onScroll}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        onHeaderRefresh={$.fetchBlog}
        onFooterRefresh={$.fetchBlog}
      />
      <Bottom fixedTextareaRef={fixedTextareaRef} />
      <TouchScroll onPress={handleScrollToThenFeedback} />
    </>
  )
}

export default observer(List)
