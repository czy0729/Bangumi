/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 01:13:58
 */
import React from 'react'
import { View } from 'react-native'
import { Page, StatusBarEvents, ListView, Track, Heatmap } from '@components'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import { WSA, MODEL_SUBJECT_TYPE } from '@constants'
import Header from './header'
import List from './list'
import LinkModal from './link-modal'
import Store from './store'

const title = '发现'

const Discovery = ({ isFocused }, { $, navigation }) => {
  useRunAfter(() => {
    $.init()

    navigation.addListener(`${EVENT_APP_TAB_PRESS}|Discovery`, () => {
      $.onRefreshThenScrollTop()
    })
  })

  return useObserver(() => {
    const { home, dragging } = $.state
    return (
      <Page>
        <StatusBarEvents backgroundColor='transparent' />
        <ListView
          ref={$.connectRef}
          style={_.container.flex}
          contentContainerStyle={_.container.bottom}
          keyExtractor={keyExtractor}
          data={home}
          ListHeaderComponent={<Header />}
          renderItem={renderItem}
          scrollToTop={isFocused || WSA}
          scrollEnabled={!dragging}
        />
        <LinkModal />
        <Track title={title} hm={['discovery', 'Discovery']} />
        <Heatmap bottom={_.bottom} id='发现' screen='Discovery' />
      </Page>
    )
  })
}

export default ic(Store, Discovery, {
  listenIsFocused: true
})

function keyExtractor(item) {
  return item.type
}

function renderItem({ item }) {
  return (
    <View>
      <List {...item} />
      <Heatmap id='发现.跳转' from={MODEL_SUBJECT_TYPE.getTitle(item.type)} />
    </View>
  )
}
