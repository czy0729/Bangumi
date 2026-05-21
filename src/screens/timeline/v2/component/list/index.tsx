/*
 * @Author: czy0729
 * @Date: 2019-04-14 00:51:13
 * @Last Modified by: imagebuilder1837
 * @Last Modified time: 2026-05-22 07:08:28
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { ListView, Loading } from '@components'
import { Login } from '@_'
import { _, uiStore, userStore, useStore } from '@stores'
import { useInsets } from '@utils/hooks'
import { IOS, MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE, PAD } from '@constants'
import { TABS } from '../../ds'
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

  const { statusBarHeight, headerHeight } = useInsets()
  const tabBarheight = 48 + (IOS && PAD ? statusBarHeight - 8 : 0)

  const contentContainerStyle = useMemo(
    () => ({
      paddingTop: headerHeight + tabBarheight,
      paddingBottom: _.bottom
    }),
    [headerHeight, tabBarheight]
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
      uiStore.closeAll()
      $.onScroll(evt)
    },
    [$]
  )

  const handleRenderItem = useCallback(
    ({ item, index }: RenderItem<TimelineItem>) => <Item title={title} item={item} index={index} />,
    [title]
  )

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
      overScrollMode='never'
      onScroll={handleScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchTimeline}
    />
  )
}

export default observer(List)
