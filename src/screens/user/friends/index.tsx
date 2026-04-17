/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:19:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 10:11:44
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Heatmap, Page } from '@components'
import { _, StoreContext } from '@stores'
import Filter from './component/filter'
import List from './component/list'
import Header from './header'
import { useFriendsPage } from './hooks'

import type { NavigationProps } from '@types'

/** 好友 */
function Friends(props: NavigationProps) {
  const { $, id } = useFriendsPage(props)

  return (
    <Component id='screen-friends'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <Filter />
          <List />
        </Page>
        <Header />
        <Heatmap bottom={_.bottom + _.sm} id='好友' screen='Friends' />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Friends)
