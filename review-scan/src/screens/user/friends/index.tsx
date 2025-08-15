/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:19:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:42:09
 */
import React from 'react'
import { Component, Heatmap, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Filter from './component/filter'
import List from './component/list'
import Header from './header'
import { useFriendsPage } from './hooks'

/** 好友 */
const Friends = (props: NavigationProps) => {
  const { id } = useFriendsPage(props)

  return useObserver(() => (
    <Component id='screen-friends'>
      <StoreContext.Provider value={id}>
        <Page style={_.container.header}>
          <Filter />
          <List />
        </Page>
        <Header />
        <Heatmap bottom={_.bottom + _.sm} id='好友' screen='Friends' />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Friends
