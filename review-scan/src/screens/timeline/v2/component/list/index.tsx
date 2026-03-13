/*
 * @Author: czy0729
 * @Date: 2019-04-14 00:51:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-27 11:00:01
 */
import React, { useCallback } from 'react'
import { ListView, Loading, ScrollToIndex } from '@components'
import { Login } from '@_'
import { uiStore, userStore, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants'
import { ScrollEvent } from '@types'
import { TABS } from '../../ds'
import { Ctx, TabLabel } from '../../types'
import Item from '../item'
import { keyExtractor } from './utils'
import { COMPONENT, ENTERING_EXITING_ANIMATIONS_NUM } from './ds'
import { styles } from './styles'

function List({ title }: { title?: TabLabel }) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  const handleForwardRef = useCallback(
    (ref: { scrollToIndex: ScrollToIndex }) => {
      return $.forwardRef(
        ref,
        TABS.findIndex(item => item.title === title)
      )
    },
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
  const renderItem = useCallback(
    ({ item, index }) => <Item title={title} item={item} index={index} />,
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
        contentContainerStyle={styles.contentContainerStyle}
        data={timeline}
        progressViewOffset={styles.contentContainerStyle.paddingTop}
        renderItem={renderItem}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.fetchTimeline}
      />
    )
  })
}

export default List
