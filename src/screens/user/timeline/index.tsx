/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:43:47
 */
import React from 'react'
import { View } from 'react-native'
import { Component, ListView, Page } from '@components'
import { MosaicTile } from '@_'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 用户的时间线 */
const UserTimeline = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-user-timeline'>
      <Header />
      <Page>
        <ListView
          data={$.timeline}
          scrollToTop
          ListHeaderComponent={
            <>
              <MosaicTile mosaicTile={$.mosaicTile} />
              <List />
            </>
          }
          renderItem={() => <View />}
          onHeaderRefresh={$.onHeaderRefresh}
          onFooterRefresh={$.fetchTimeline}
        />
      </Page>
    </Component>
  ))
}

export default ic(Store, UserTimeline)
