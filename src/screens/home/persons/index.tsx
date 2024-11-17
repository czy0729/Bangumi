/*
 * @Author: czy0729
 * @Date: 2020-05-21 16:36:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:09:41
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Extra from './component/extra'
import List from './component/list'
import ToolBar from './component/tool-bar'
import Header from './header'
import { usePersonsPage } from './hooks'

/** 制作人员 */
const Persons = (props: NavigationProps) => {
  const { id, $ } = usePersonsPage(props)

  return useObserver(() => (
    <Component id='screen-persons'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page loaded={$.persons._loaded}>
          <ToolBar />
          <List />
        </Page>
        <Extra />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Persons
