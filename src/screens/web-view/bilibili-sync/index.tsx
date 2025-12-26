/*
 * @Author: czy0729
 * @Date: 2022-02-23 06:46:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-26 22:31:14
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Login from './component/login'
import Header from './header'
import { useBilibiliSyncPage } from './hooks'

import type { NavigationProps } from '@types'

/** bilibili 同步 */
const BilibiliSync = (props: NavigationProps) => {
  const { id, $ } = useBilibiliSyncPage(props)

  return useObserver(() => (
    <Component id='screen-bilibili-sync'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <Login
            hide={$.state.hide}
            onToggleHide={$.onToggleHide}
            setData={$.setData}
            setReviews={$.setReviews}
          />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default BilibiliSync
