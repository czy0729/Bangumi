/*
 * @Author: czy0729
 * @Date: 2022-10-16 16:48:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-26 22:34:47
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Login from './component/login'
import Tips from './component/tips'
import Header from './header'
import { useDoubanSyncPage } from './hooks'

import type { NavigationProps } from '@types'

/** 豆瓣同步 */
const DoubanSync = (props: NavigationProps) => {
  const { id, $ } = useDoubanSyncPage(props)

  return useObserver(() => (
    <Component id='screen-douban-sync'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
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
