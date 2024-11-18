/*
 * @Author: czy0729
 * @Date: 2024-01-06 23:08:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:19:05
 */
import React from 'react'
import { View } from 'react-native'
import { ListView, Loading } from '@components'
import { SectionHeader, TapListener } from '@_'
import { useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from './item'
import { COMPONENT } from './ds'
import { styles } from './styles'

function TimelineList() {
  const { $ } = useStore<Ctx>()
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

export default ob(TimelineList, COMPONENT)

function renderSectionHeader({ section: { title } }) {
  return <SectionHeader>{title}</SectionHeader>
}

function renderItem({ item, index }) {
  return <Item index={index} item={item} />
}
