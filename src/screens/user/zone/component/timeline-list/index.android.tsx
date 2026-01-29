/*
 * @Author: czy0729
 * @Date: 2024-01-06 23:08:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-29 12:45:34
 */
import React from 'react'
import { View } from 'react-native'
import { ListView, Loading } from '@components'
import { TapListener } from '@_'
import { useStore } from '@stores'
import { keyExtractor } from '@utils'
import { useObserver } from '@utils/hooks'
import { renderItem, renderSectionHeader } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function TimelineList() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
          onFooterRefresh={$.fetchUsersTimeline}
        />
      </TapListener>
    )
  })
}

export default TimelineList
