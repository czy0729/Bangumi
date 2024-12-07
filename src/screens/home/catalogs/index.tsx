/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:54:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 09:46:49
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Extra from './component/extra'
import List from './component/list'
import Header from './header'
import { useCatalogsPage } from './hooks'

/** 条目目录 */
const Catalogs = (props: NavigationProps) => {
  const { id, $ } = useCatalogsPage(props)

  return useObserver(() => (
    <Component id='screen-subject-catalogs'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.list._loaded}>
          <List />
        </Page>
        <Header />
        <Extra />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Catalogs
