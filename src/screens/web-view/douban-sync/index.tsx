/*
 * @Author: czy0729
 * @Date: 2022-10-16 16:48:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 05:43:57
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Login from './component/login'
import Tips from './component/tips'
import Header from './header'
import { useDoubanSyncPage } from './hooks'

/** 豆瓣同步 */
const DoubanSync = (props: NavigationProps) => {
  const { id, $ } = useDoubanSyncPage(props)

  return useObserver(() => (
    <Component id='screen-douban-sync'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <Login />
          <List />
          <Tips />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default DoubanSync
