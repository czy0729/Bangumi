/*
 * @Author: czy0729
 * @Date: 2019-04-14 00:51:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-31 14:39:57
 */
import React, { useCallback, useMemo } from 'react'
import { ListView, Loading } from '@components'
import { Login } from '@_'
import { _, uiStore, userStore, useStore } from '@stores'
import { useInsets, useObserver } from '@utils/hooks'
import { MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants'
import { H_TABBAR, TABS } from '../../ds'
import Item from '../item'
import { keyExtractor } from './utils'
import { COMPONENT, ENTERING_EXITING_ANIMATIONS_NUM } from './ds'

import type { ScrollToIndex } from '@components'
import type { RenderItem, ScrollEvent } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'
import type { TimelineItem } from '@stores/timeline/types'

function List({ title }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { headerHeight } = useInsets()
  const contentContainerStyle = useMemo(
    () => ({
      paddingTop: headerHeight + H_TABBAR,
      paddingBottom: _.bottom
    }),
    [headerHeight]
  )

  const handleForwardRef = useCallback(
    (ref: { scrollToIndex: ScrollToIndex }) =>
      $.forwardRef(
        ref,
        TABS.findIndex(item => item.title === title)
      ),
    [$, title]
  )
  const handleScroll = useCallback(
    (evt: ScrollEvent) => {
      uiStore.closePopableSubject()
      uiStore.closeLikesGrid()
      $.onScroll(evt)
    },
    [$]
  )
  const handleRenderItem = useCallback(
    ({ item, index }: RenderItem<TimelineItem>) => <Item title={title} item={item} index={index} />,
    [title]
  )

  return useObserver(() => {
    if (
      !userStore.isWebLogin &&
      ['好友', '自己'].includes(MODEL_TIMELINE_SCOPE.getLabel($.state.scope))
    ) {
      return <Login />
    }

    const { scope } = $.state
    const timeline = $.timeline(scope, MODEL_TIMELINE_TYPE.getValue(title))
    if (!timeline._loaded) return <Loading />

    if (!$.showItem(title)) return null

    return (
      <ListView
        key={scope}
        ref={handleForwardRef}
        keyExtractor={keyExtractor}
        skipEnteringExitingAnimations={ENTERING_EXITING_ANIMATIONS_NUM}
        contentContainerStyle={contentContainerStyle}
        progressViewOffset={contentContainerStyle.paddingTop}
        data={timeline}
        renderItem={handleRenderItem}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.fetchTimeline}
      />
    )
  })
}

export default List
