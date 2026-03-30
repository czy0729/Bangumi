/*
 * @Author: czy0729
 * @Date: 2019-11-28 16:57:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-31 05:15:10
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import Tab from './component/tab'
import Header from './header'
import { useRakuenHistoryPage } from './hooks'

import type { NavigationProps } from '@types'

/** 帖子聚合 */
function RakuenHistory(props: NavigationProps) {
  const { id, $ } = useRakuenHistoryPage(props)

  return (
    <Component id='screen-history'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <Tab />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(RakuenHistory)
