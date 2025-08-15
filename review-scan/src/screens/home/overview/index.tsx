/*
 * @Author: czy0729
 * @Date: 2024-09-18 14:20:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 10:10:06
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Header from './header'
import { useOverviewPage } from './hooks'

/** 条目封面一览 */
const Overview = (props: NavigationProps) => {
  const { id } = useOverviewPage(props)

  return useObserver(() => (
    <Component id='screen-overview'>
      <StoreContext.Provider value={id}>
        <Page>
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Overview
