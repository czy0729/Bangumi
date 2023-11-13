/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 21:23:18
 */
import React from 'react'
import { View } from 'react-native'
import { Page, ListView, Component } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import MosaicTile from './mosaic-tile'
import List from './list'
import Store from './store'
import { Ctx } from './types'

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
              <MosaicTile />
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
