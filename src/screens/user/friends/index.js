/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:19:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 01:34:56
 */
import React from 'react'
import { Page, ListView, Heatmap } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Filter from './filter'
import Item from './item'
import Store from './store'

const Friends = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header />
      <Page>
        <ListView
          data={$.friends}
          keyExtractor={keyExtractor}
          scrollToTop
          ListHeaderComponent={<Filter />}
          renderItem={renderItem}
          onHeaderRefresh={$.refresh}
        />
      </Page>
      <Heatmap bottom={_.bottom + _.sm} id='好友' screen='Friends' />
    </>
  ))
}

export default ic(Store, Friends)

function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}

function keyExtractor(item) {
  return String(item.userId)
}
