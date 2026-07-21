/*
 * @Author: czy0729
 * @Date: 2024-01-06 23:08:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:56:58
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ListView, Loading } from '@components'
import { TapListener } from '@_'
import { uiStore, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { renderItem, renderSectionHeader } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function TimelineList() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const handleScrollBeginDrag = useCallback(() => {
    uiStore.closeAll()
  }, [])

  const handleHeaderRefresh = useCallback(() => $.fetchUsersTimeline(true, true), [$])

  if (!$.usersTimeline._loaded) {
    return (
      <View style={styles.nestScrollLoading}>
        <Loading.Raw />
      </View>
    )
  }

  return (
    <TapListener>
      <ListView
        nestedScrollEnabled
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.nestScroll}
        data={$.usersTimeline}
        sectionKey='date'
        stickySectionHeadersEnabled={false}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        onScrollBeginDrag={handleScrollBeginDrag}
        onHeaderRefresh={handleHeaderRefresh}
        onFooterRefresh={$.fetchUsersTimeline}
      />
    </TapListener>
  )
}

export default observer(TimelineList)
