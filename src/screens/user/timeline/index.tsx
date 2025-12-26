/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-26 22:04:36
 */
import React from 'react'
import { View } from 'react-native'
import { Component, HeaderPlaceholder, ListView, Page } from '@components'
import { MosaicTile } from '@_'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import { useUserTimelinePage } from './hooks'

import type { NavigationProps } from '@types'

/** 用户的时间线 */
const UserTimeline = (props: NavigationProps) => {
  const { id, $ } = useUserTimelinePage(props)

  return useObserver(() => (
    <Component id='screen-user-timeline'>
      <StoreContext.Provider value={id}>
        <Page>
          <HeaderPlaceholder />
          <ListView
            data={$.timeline}
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
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default UserTimeline
