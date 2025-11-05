/*
 * @Author: czy0729
 * @Date: 2024-01-06 22:02:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:01:04
 */
import React from 'react'
import { View } from 'react-native'
import { ListView, Loading } from '@components'
import { useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Footer from './footer'
import Item from './item'
import SectionHeader from './section-header'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function BangumiList() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { list, _loaded } = $.userCollections
  if (!_loaded) {
    return (
      <View style={styles.nestScrollLoading}>
        <Loading.Raw />
      </View>
    )
  }

  return (
    <ListView
      nestedScrollEnabled
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.nestScroll}
      sections={list.map(item => ({
        title: item.status,
        count: item.count,
        data: [
          {
            list: item.list
          }
        ]
      }))}
      showFooter={false}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      ListFooterComponent={<Footer />}
    />
  )
}

export default ob(BangumiList, COMPONENT)

function renderSectionHeader({ section: { title, count } }) {
  return <SectionHeader title={title} count={count} />
}

function renderItem({ item, section: { title } }) {
  return <Item item={item} title={title} />
}
