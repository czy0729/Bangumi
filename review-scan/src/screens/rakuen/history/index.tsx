/*
 * @Author: czy0729
 * @Date: 2019-11-28 16:57:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 16:20:52
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Tab from './component/tab'
import Header from './header'
import { useRakuenHistoryPage } from './hooks'

/** 帖子聚合 */
const RakuenHistory = (props: NavigationProps) => {
  const { id, $ } = useRakuenHistoryPage(props)

  return useObserver(() => (
    <Component id='screen-history'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <Tab />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default RakuenHistory
