/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:54:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:25:21
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Extra from './component/extra'
import List from './component/list'
import Header from './header'
import { useCatalogsPage } from './hooks'

import type { NavigationProps } from '@types'

/** 条目目录 */
const Catalogs = (props: NavigationProps) => {
  const { id, $ } = useCatalogsPage(props)

  return useObserver(() => (
    <Component id='screen-subject-catalogs'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.list._loaded}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
        <Extra />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Catalogs
