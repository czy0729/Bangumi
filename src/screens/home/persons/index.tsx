/*
 * @Author: czy0729
 * @Date: 2020-05-21 16:36:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-25 05:20:03
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Extra from './component/extra'
import List from './component/list'
import ToolBar from './component/tool-bar'
import Header from './header'
import { usePersonsPage } from './hooks'

import type { NavigationProps } from '@types'

/** 制作人员 */
const Persons = (props: NavigationProps) => {
  const { id, $ } = usePersonsPage(props)

  return useObserver(() => (
    <Component id='screen-persons'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.persons._loaded}>
          <HeaderPlaceholder />
          <ToolBar />
          <List />
        </Page>
        <Header />
        <Extra />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Persons
