/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:20:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 02:20:30
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import ToolBar from './component/tool-bar'
import Header from './header'
import { useOverviewPage } from './hooks'

import type { NavigationProps } from '@types'

/** 条目封面一览 */
const Overview = (props: NavigationProps) => {
  const { id } = useOverviewPage(props)

  return useObserver(() => (
    <Component id='screen-overview'>
      <StoreContext.Provider value={id}>
        <Page>
          <HeaderPlaceholder />
          <ToolBar />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Overview
