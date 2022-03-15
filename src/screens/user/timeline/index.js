/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 02:05:24
 */
import React from 'react'
import { View } from 'react-native'
import { Page, ListView } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import MosaicTile from './mosaic-tile'
import List from './list'
import Store from './store'

const UserTimeline = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
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
          onHeaderRefresh={async () => {
            await $.fetchMosaicTile()
            return $.fetchTimeline(true)
          }}
          onFooterRefresh={$.fetchTimeline}
        />
      </Page>
    </>
  ))
}

export default ic(Store, UserTimeline)
