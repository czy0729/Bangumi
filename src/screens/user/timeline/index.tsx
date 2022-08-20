/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-20 15:49:07
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
import { Ctx } from './types'

const UserTimeline = (props, { $ }: Ctx) => {
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
          onHeaderRefresh={$.onHeaderRefresh}
          onFooterRefresh={$.fetchTimeline}
        />
      </Page>
    </>
  ))
}

export default ic(Store, UserTimeline)
