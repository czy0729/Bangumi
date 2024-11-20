/*
 * @Author: czy0729
 * @Date: 2022-02-23 06:46:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 05:36:56
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Login from './component/login'
import Header from './header'
import { useBilibiliSyncPage } from './hooks'

/** bilibili 同步 */
const BilibiliSync = (props: NavigationProps) => {
  const { id, $ } = useBilibiliSyncPage(props)

  return useObserver(() => (
    <Component id='screen-bilibili-sync'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page loaded={$.state._loaded}>
          <Login
            hide={$.state.hide}
            onToggleHide={$.onToggleHide}
            setData={$.setData}
            setReviews={$.setReviews}
          />
          <List />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default BilibiliSync
