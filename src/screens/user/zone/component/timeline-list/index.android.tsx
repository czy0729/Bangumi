/*
 * @Author: czy0729
 * @Date: 2024-01-06 23:08:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 01:33:15
 */
import React from 'react'
import { View } from 'react-native'
import { ListView, Loading } from '@components'
import { SectionHeader, TapListener } from '@_'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from './item'
import { COMPONENT } from './ds'
import { styles } from './styles'

function TimelineList(_props, { $ }: Ctx) {
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
}

export default obc(TimelineList, COMPONENT)

function renderSectionHeader({ section: { title } }) {
  return <SectionHeader>{title}</SectionHeader>
}

function renderItem({ item, index }) {
  return <Item index={index} item={item} />
}
